import {
  StoreProps, CurrencyProps, ProductProps, IntlShippingFee,
} from '@/app/type';
import getData from '../../../components/fetch/fetch';
import { EU } from '../../../components/meta/country';
import {
  productCat,
  defaultProductType,
  ProductCatProps,
  consumptionTaxStd,
} from '../../../components/meta/product';
import { roundDecimal, roundDigit } from '../../components/utils';

export type DevProductTableProps = {
  productPrice: ProductPriceProps
  deliveryInfo: IntlDeliveryProps
  tax: TaxProps
  productInfo: ProductProps
  productType: ProductCatProps
  storeInfo: StoreProps
  sellingInfo:SellingProps
};
export type ProductPriceProps = {
  currencyCode: string
  retailPrice: number
  salePrice: number
  taxReducedRetailPrice: number
  taxReducedSalePrice: number
  RetailKRWPrice: number
  KRWPrice: number
  saleRate: number
};
export type IntlDeliveryProps = {
  currencyCode: string
  shippingFee: number
  KRWShippingFee: number
  shippingFeePerPrice: number
  KRWShippingFeePerPrice: number
  numOfProduct: number
  isFreeDelivery: boolean
  isCumulative?: boolean
};
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
};
export type SellingProps = {
  retailPrice:number
  commission:number
  DVAT:number // domestic VAT
  cost:number
};

export type MarginOptionProps = {
  margin :number
  commission :number
  numOfProduct:number
  VAT :number
};

export class DevPriceCalculator {
  // 대량 구매에 맞는 계산기
  // 기존에 비해 관세 계산 + 건당 배송비 계산하도록 수정
  storeArr!: StoreProps[];
  currency!: CurrencyProps;
  MarginOption!: MarginOptionProps;

  calcAll(productInfo: ProductProps): DevProductTableProps {
    const storeInfo = this.storeArr.find((s) => s.store_name === productInfo.store_name)!;
    const productType = this.findProductType(productInfo);
    // 배송
    const productPrice = this.calcProductPrice(productInfo, storeInfo);
    const deliveryInfo = this.calcDeliveryPrice([productInfo], storeInfo);
    const tax = this.calcTax(
      productPrice,
      deliveryInfo,
      productType!,
      storeInfo,
      productInfo.mande_in!,
    );
    const sellingInfo = this.calcSelling(
      productPrice.KRWPrice,
      deliveryInfo.KRWShippingFeePerPrice,
      tax.totalTax,
    );
    return {
      productPrice,
      deliveryInfo,
      tax,
      productInfo,
      productType,
      storeInfo,
      sellingInfo,
    };
  }

  calcProductPrice(productInfo: ProductProps, storeInfo: StoreProps): ProductPriceProps {
    const taxReducedRetailPrice = this.toTaxReducedPrice(productInfo.retail_price, storeInfo);
    const taxReducedSalePrice = this.toTaxReducedPrice(productInfo.sale_price, storeInfo);
    const saleRate = roundDecimal(1 - productInfo.sale_price / productInfo.retail_price, 2);
    return {
      currencyCode: productInfo.currency_code,
      retailPrice: productInfo.retail_price,
      salePrice: productInfo.sale_price,
      taxReducedRetailPrice,
      taxReducedSalePrice,
      RetailKRWPrice: this.toKRWPrice(taxReducedRetailPrice, productInfo.currency_code),
      KRWPrice: this.toKRWPrice(taxReducedSalePrice, productInfo.currency_code),
      saleRate,
    };
  }

  calcDeliveryPrice(products: ProductProps[], storeInfo: StoreProps): IntlDeliveryProps {
    const totalPrice = products.reduce((total: number, p) => total + p.sale_price, 0);
    const totalTaxReducedPrice = this.toTaxReducedPrice(totalPrice, storeInfo);
    const isFreeDelivery = this.isIntlFreeDelivery(
      totalTaxReducedPrice,
      storeInfo.intl_free_shipping_min,
    );
    if (isFreeDelivery) {
      return {
        currencyCode: storeInfo.currency,
        shippingFee: 0,
        shippingFeePerPrice: 0,
        KRWShippingFee: 0,
        KRWShippingFeePerPrice: 0,
        numOfProduct: products.length,
        isFreeDelivery: true,
      };
    }

    const isCumulative = storeInfo.shipping_fee_cumulation;
    if (!isCumulative) {
      const fee = storeInfo.intl_shipping_fee.Shoes;
      const shippingFeePerPrice = roundDecimal(fee / this.MarginOption.numOfProduct, 2);
      return {
        currencyCode: storeInfo.currency,
        shippingFee: fee,
        shippingFeePerPrice,
        KRWShippingFee: this.toKRWPrice(fee, storeInfo.currency),
        KRWShippingFeePerPrice: this.toKRWPrice(shippingFeePerPrice, storeInfo.currency),
        numOfProduct: this.MarginOption.numOfProduct,
        isFreeDelivery: false,
        isCumulative: false,
      };
    }

    const totalDeliveryFee = products.reduce(
      (partial, p) => partial + this.intlDeliveryPrice(p, storeInfo.intl_shipping_fee),
      0,
    );
    const shippingFeePerPrice = roundDecimal(totalDeliveryFee / products.length, 2);
    return {
      currencyCode: storeInfo.currency,
      shippingFee: totalDeliveryFee,
      shippingFeePerPrice,
      KRWShippingFee: this.toKRWPrice(totalDeliveryFee, storeInfo.currency),
      KRWShippingFeePerPrice: this.toKRWPrice(shippingFeePerPrice, storeInfo.currency),
      numOfProduct: products.length,
      isFreeDelivery: false,
      isCumulative: true,
    };
  }

  isIntlFreeDelivery(taxReducedPrice: number, storeFreeShippingMin: number): boolean {
    if (storeFreeShippingMin === 0) {
      return false;
    }
    if (taxReducedPrice >= storeFreeShippingMin) {
      return true;
    }
    return false;
  }

  intlDeliveryPrice(productInfo: ProductProps, intlShippingFee: IntlShippingFee): number {
    const productType = this.findProductType(productInfo);
    const DeliveryIntlFee = intlShippingFee[productType?.deliveryStd as keyof IntlShippingFee];
    return DeliveryIntlFee ?? intlShippingFee.Shoes;
  }

  calcTax(
    productPrice: ProductPriceProps,
    deliveryInfo: IntlDeliveryProps,
    productType: ProductCatProps,
    storeInfo: StoreProps,
    productCountry: string,
  ): TaxProps {
    const custumUSDPirce = this.convertCustomUSD(
      productPrice.taxReducedSalePrice,
      productPrice.currencyCode,
    );

    const consumptionTax = (consumptionTaxStd - custumUSDPirce) * productType.consumptionTaxRate;
    const custumUSDDelivery = this.convertCustomUSD(
      deliveryInfo.shippingFeePerPrice,
      deliveryInfo.currencyCode,
    );
    const UsCurrency = this.currency.custom.Data.USD;
    const totalKRWPrice = (custumUSDPirce + custumUSDDelivery) * UsCurrency;
    const isFTA = this.isFTA(productCountry, storeInfo.country);
    const customTax = !isFTA ? totalKRWPrice * productType.customRate : 0;
    const VAT = (totalKRWPrice + customTax) * 0.1;

    return {
      totalTax: VAT + consumptionTax + customTax,
      customTax,
      VAT,
      consumptionTax,
      isCustomDuty: true,
      IsFTA: !!isFTA,
      brokerFee: storeInfo.broker_fee ? 30_000 : 0,
      freeCustomLimit: storeInfo.country === 'US' ? 200 : 150,
      custumUSDPirce,
    };
  }

  calcSelling(productPrice:number, deliveryPrice:number, tax:number): SellingProps {
    // Y 판매가 X 구매가 a 수수료(%) b 부가세(%) c 마진율(%)
    // 수수료 계산 = aY,부가세 계산 = (Y-X-aY)*b
    const productCost = productPrice + deliveryPrice + tax;
    const retailPrice = this.calcRetailPrice(productCost);
    const commission = this.calcStoreFee(retailPrice);
    const DVAT = this.calcDVAT(retailPrice - (productCost + commission));
    const cost = productCost + commission + DVAT;

    return {
      retailPrice, commission, DVAT, cost,
    };
  }

  calcRetailPrice(productCost:number):number {
    // Y 판매가 X 구매가 a 수수료(%) b 부가세(%) c 마진율(%)
    // 수수료 계산 = aY,부가세 계산 = (Y-X-aY)*b
    // Y = (X + aY +(Y-X-aY)*b)*c
    // Y = ((1-b)/(1/(1+c))-a+(a-1)b)X
    const a = this.MarginOption.commission / 100;
    const b = this.MarginOption.VAT / 100;
    const c = this.MarginOption.margin / 100;

    const numerator = (1 - b);
    const denominator = ((1 / (1 + c)) - a + (a - 1) * b);
    return (numerator / denominator) * productCost;
  }

  calcStoreFee(ProductPrice:number) {
    return this.MarginOption.commission !== 0
      ? ProductPrice * (this.MarginOption.commission / 100) : 0;
  }

  calcDVAT(price:number) {
    return this.MarginOption.VAT !== 0
      ? price * (this.MarginOption.VAT / 100) : 0;
  }

  convertCustomUSD(price: number, currencyCode: string): number {
    if (currencyCode === 'USD') {
      return price;
    }
    const currency = this.currency.custom.Data[currencyCode];
    const UsCurrency = this.currency.custom.Data.USD;
    const KorPrice = price * currency;
    const UsPrice = KorPrice / UsCurrency;
    return roundDecimal(UsPrice, 2);
  }

  isFTA(productCountry: string, storeCountry: string): boolean {
    if (productCountry) {
      if (productCountry === storeCountry) {
        return true;
      }

      const isStoreInEU = EU.has(storeCountry);
      if (isStoreInEU) {
        const isProductMadeInEU = EU.has(productCountry);
        return isProductMadeInEU;
      }
      return false;
    }

    return false;
  }

  isCustomDuty(USD: number, storeCountry: string): boolean {
    const customLimit = storeCountry === 'US' ? 200 : 150;
    return USD >= customLimit;
  }

  findProductType(productInfo: ProductProps) {
    const r = productCat.find((p) => p.categorySpec === productInfo.category_spec!);
    return r || defaultProductType;
  }

  toTaxReducedPrice(price: number, storeInfo: StoreProps) {
    if (storeInfo.tax_reduction_manually) {
      return roundDecimal(price / (1 + storeInfo.tax_reduction), 2);
    }
    return price;
  }

  toKRWPrice(price: number, currencyCode: string): number {
    if (currencyCode === 'KRW') { return price; }
    const currency = this.currency.buying.Data[currencyCode];
    return roundDigit(price * currency, 2);
  }
}

async function NewDevPriceCalculator(MarginOption:MarginOptionProps) {
  const inst = new DevPriceCalculator();
  inst.MarginOption = MarginOption;
  inst.storeArr = await getData('store');
  inst.currency = await getData('currency');
  return inst;
}

export default NewDevPriceCalculator;
