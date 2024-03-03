import { getData } from "../fetch/fetch";
import { StoreProps, CurrencyProps, ProductProps } from "@/app/type";

type ProductDeliveryProps = { [key: string]: "Heavy" | "Light" | "Shoes" }

const productDelivery: ProductDeliveryProps = {
    "etc": "Heavy"
}

async function NewPriceCalculator() {
    const inst = new PriceCalculator()
    inst.storeArr = await getData("store")
    inst.currency = await getData("currency")
    return inst
}

export class PriceCalculator {
    storeArr!: StoreProps[]
    currency!: CurrencyProps
    productDelivery: ProductDeliveryProps

    constructor() {
        this.storeArr
        this.currency
        this.productDelivery = productDelivery
    }

    priceWithoutTax(product: ProductProps, store: StoreProps): number {
        const taxReduction = store.tax_reduction
        var taxReducedPrice = (product.sale_price / (1 + taxReduction!))
        return taxReduction ? taxReducedPrice : 0
    }
    korProductPrice(product: ProductProps): number {
        const store = this.storeArr.find((s) => (s.id === product.store_name))
        const price = this.priceWithoutTax(product, store!)
        const currency = this.currency.buying.Data[product.currency_code]
        return Math.round(price * currency)
    }

    intlDeliveryPrice(product: ProductProps, store: StoreProps): number {
        const DeliveryType = this.productDelivery[product.category_spec!]
        const DeliveryIntlFee = store?.intl_shipping_fee[DeliveryType]
        return DeliveryIntlFee ?? 0
    }

    korIntlDeliveryPrice(product: ProductProps): number {
        const store = this.storeArr.find((s) => (s.id === product.store_name))
        const DeliveryIntlFee = this.intlDeliveryPrice(product, store!)
        const currency = this.currency.buying.Data[product.currency_code]
        return this.roundDigit(DeliveryIntlFee * currency, 2)
    }
    convertCustomUSD(product: ProductProps, store: StoreProps): number {
        var currency_code = product.currency_code
        if (currency_code === 'USD') {
            return this.priceWithoutTax(product, store)
        } else {
            const currency = this.currency.custom.Data[currency_code]
            const UsCurrency = this.currency.custom.Data['USD']
            const taxReducedPrice = this.priceWithoutTax(product, store)
            const KorPrice = taxReducedPrice * currency
            const UsPrice = KorPrice / UsCurrency
            return this.roundDecimal(UsPrice, 2)
        }
    }
    isCustomDuty(customUSD: number, store: StoreProps): boolean {
        const country = store.country
        const customLimit = country === "US" ? 200 : 150
        return customUSD >= customLimit ? true : false
    }
    isIntlFreeDelivery(taxReducedPrice: number, store: StoreProps): boolean {
        const limit = store.intl_free_shipping_fee

        if (limit === 0) {
            return false
        }
        if (taxReducedPrice >= limit) {
            return true
        }
        return false

    }

    roundDecimal(x: number, decimal: number): number {
        const n = 10 ** decimal
        return Math.round(x * n) / n
    }
    roundDigit(x: number, digit: number): number {
        const n = 10 ** digit
        return Math.round(x / n) * n
    }
    // 43233 => 43200으로 바꾸는 함수

}

export default NewPriceCalculator