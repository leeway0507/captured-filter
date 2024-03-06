import { getData } from '../fetch/fetch'
import { StoreProps, CurrencyProps, ProductProps, IntlShippingFee } from '@/app/type'
import { EU, CountryToISO2, productCat, productCatProps, consumptionTaxStd } from './meta'

export type calcAllProps = {
  productPrice: ProductPriceProps
  delivery: IntlDeliveryProps
  tax: TaxProps
  productInfo: ProductProps
  productType: productCatProps
  storeInfo: StoreProps
}
export type ProductPriceProps = {
  currencyCode: string
  retailPrice: number
  salePrice: number
  taxReducedRetailPrice: number
  taxReducedSalePrice: number
  RetailKRWPrice: number
  KRWPrice: number
  saleRate: number
}
export type IntlDeliveryProps = {
  currencyCode: string
  shippingFee: number
  KRWShippingFee: number
  shippingFeePerPrice: number
  KRWShippingFeePerPrice: number
  numOfProduct: number
  isFreeDelivery: boolean
  isCumulative?: boolean
}
export type TaxProps = {
  totalTax: number
  customTax: number
  VAT: number
  consumptionTax: number
  isCustomDuty: boolean
  freeCustomLimit: number
  custumUSDPirce: number
  IsFTA?: boolean
  brokerFee?: number
}

async function NewPriceCalculator() {
  const inst = new PriceCalculator()
  console.log(await getData('store'))
  inst.storeArr = await getData('store')
  inst.currency = await getData('currency')
  return inst
}

export class PriceCalculator {
  storeArr!: StoreProps[]
  currency!: CurrencyProps

  constructor() {
    this.storeArr
    this.currency
  }

  calcAll(product: ProductProps): calcAllProps {
    const store = this.storeArr.find((s) => s.id === product.store_name)!
    const productType = this.productType(product)
    // 배송
    const productPrice = this.calcProductPrice(product, store)
    const deliveryPrice = this.calcDeliveryPrice([product], store)
    const tax = this.calcTax(productPrice, deliveryPrice, productType!, store, product.mande_in!)
    return {
      productPrice: productPrice,
      delivery: deliveryPrice,
      tax: tax,
      productInfo: product!,
      productType: productType!,
      storeInfo: store,
    }
  }

  calcProductPrice(product: ProductProps, store: StoreProps): ProductPriceProps {
    const taxReducedRetailPrice = this.roundDecimal(product.retail_price / (1 + store.tax_reduction), 2)
    const taxReducedSalePrice = this.roundDecimal(product.sale_price / (1 + store.tax_reduction), 2)
    const saleRate = this.roundDecimal(1 - product.sale_price / product.retail_price, 2)
    return {
      currencyCode: product.currency_code,
      retailPrice: product.retail_price,
      salePrice: product.sale_price,
      taxReducedRetailPrice: taxReducedRetailPrice,
      taxReducedSalePrice: taxReducedSalePrice,
      RetailKRWPrice: this.toKRWPrice(taxReducedRetailPrice, product.currency_code),
      KRWPrice: this.toKRWPrice(taxReducedSalePrice, product.currency_code),
      saleRate: saleRate,
    }
  }

  calcDeliveryPrice(products: ProductProps[], store: StoreProps): IntlDeliveryProps {
    const totalPrice = products.reduce((partial: number, p) => partial + p.sale_price, 0)
    const totalTaxReducedPrice = totalPrice * store.tax_reduction
    const isFreeDelivery = this.isIntlFreeDelivery(totalTaxReducedPrice, store.intl_free_shipping_min)
    if (isFreeDelivery) {
      return {
        currencyCode: store.currency,
        shippingFee: 0,
        shippingFeePerPrice: 0,
        KRWShippingFee: 0,
        KRWShippingFeePerPrice: 0,
        numOfProduct: products.length,
        isFreeDelivery: true,
      }
    }

    const isCumulative = store.shipping_fee_cumulation
    if (!isCumulative) {
      const fee = store.intl_shipping_fee.Shoes
      const shippingFeePerPrice = this.roundDecimal(fee / products.length, 2)
      return {
        currencyCode: store.currency,
        shippingFee: fee,
        shippingFeePerPrice: shippingFeePerPrice,
        KRWShippingFee: this.toKRWPrice(fee, store.currency),
        KRWShippingFeePerPrice: this.toKRWPrice(shippingFeePerPrice, store.currency),
        numOfProduct: products.length,
        isFreeDelivery: false,
        isCumulative: false,
      }
    }

    const totalDeliveryFee = products.reduce(
      (partial, p) => partial + this.intlDeliveryPrice(p, store.intl_shipping_fee),
      0,
    )
    const shippingFeePerPrice = this.roundDecimal(totalDeliveryFee / products.length, 2)
    return {
      currencyCode: store.currency,
      shippingFee: totalDeliveryFee,
      shippingFeePerPrice: shippingFeePerPrice,
      KRWShippingFee: this.toKRWPrice(totalDeliveryFee, store.currency),
      KRWShippingFeePerPrice: this.toKRWPrice(shippingFeePerPrice, store.currency),
      numOfProduct: products.length,
      isFreeDelivery: false,
      isCumulative: true,
    }
  }

  isIntlFreeDelivery(taxReducedPrice: number, storeFreeShippingMin: number): boolean {
    if (storeFreeShippingMin === 0) {
      return false
    }
    if (taxReducedPrice >= storeFreeShippingMin) {
      return true
    }
    return false
  }

  intlDeliveryPrice(product: ProductProps, intlShippingFee: IntlShippingFee): number {
    const productType = this.productType(product)
    const DeliveryIntlFee = intlShippingFee[productType?.deliveryStd!]
    return DeliveryIntlFee ?? intlShippingFee.Shoes
  }

  calcTax(
    productPrice: ProductPriceProps,
    deliveryPrice: IntlDeliveryProps,
    productType: productCatProps,
    store: StoreProps,
    productCountry: string,
  ): TaxProps {
    const custumUSDPirce = this.convertCustomUSD(productPrice.taxReducedSalePrice, productPrice.currencyCode)
    if (!this.isCustomDuty(custumUSDPirce, store.country)) {
      return {
        totalTax: 0,
        customTax: 0,
        VAT: 0,
        consumptionTax: 0,
        isCustomDuty: false,
        freeCustomLimit: store.country === 'US' ? 200 : 150,
        custumUSDPirce: custumUSDPirce,
      }
    }

    const consumptionTax = (consumptionTaxStd - custumUSDPirce) * productType.consumptionTaxRate

    const custumUSDDelivery = this.convertCustomUSD(deliveryPrice.shippingFee, deliveryPrice.currencyCode)
    const UsCurrency = this.currency.custom.Data['USD']

    const totalKRWPrice = (custumUSDPirce + custumUSDDelivery) * UsCurrency
    const isFTA = this.isFTA(productCountry, store.country)
    const customTax = isFTA ? totalKRWPrice * productType.customRate : 0
    const VAT = (totalKRWPrice + customTax) * 0.1
    return {
      totalTax: VAT + consumptionTax + customTax,
      customTax: customTax,
      VAT: VAT,
      consumptionTax: consumptionTax,
      isCustomDuty: true,
      IsFTA: isFTA ? true : false,
      brokerFee: store.broker_fee ? 30_000 : 0,
      freeCustomLimit: store.country === 'US' ? 200 : 150,
      custumUSDPirce: custumUSDPirce,
    }
  }

  convertCustomUSD(price: number, currencyCode: string): number {
    if (currencyCode === 'USD') {
      return price
    } else {
      const currency = this.currency.custom.Data[currencyCode]
      const UsCurrency = this.currency.custom.Data['USD']
      const KorPrice = price * currency
      const UsPrice = KorPrice / UsCurrency
      return this.roundDecimal(UsPrice, 2)
    }
  }
  isFTA(productCountry: string, storeCountry: string): boolean {
    if (productCountry) {
      if (productCountry === storeCountry) {
        return true
      }

      const isStoreInEU = EU.has(storeCountry)
      if (isStoreInEU) {
        const isProductMadeInEU = EU.has(productCountry)
        return isProductMadeInEU
      }
      return false
    }

    return false
  }

  isCustomDuty(USD: number, storeCountry: string): boolean {
    const customLimit = storeCountry === 'US' ? 200 : 150
    return USD >= customLimit ? true : false
  }

  productType(product: ProductProps) {
    return productCat.find((p) => p.categorySpec === product.category_spec!)
  }

  toKRWPrice(price: number, currencyCode: string): number {
    const currency = this.currency.buying.Data[currencyCode]
    return this.roundDigit(price * currency, 2)
  }

  roundDecimal(x: number, decimal: number): number {
    const n = 10 ** decimal
    return Math.round(x * n) / n
  }
  roundDigit(x: number, digit: number): number {
    const n = 10 ** digit
    return Math.round(x / n) * n
  }
}

export default NewPriceCalculator
