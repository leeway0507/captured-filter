import 'dotenv/config'
import { PriceCalculator } from '@/app/components/product/price_calculator'
import buying from "./mock_data/buying.json"
import custom from "./mock_data/custom.json"
import stores from "./mock_data/store.json"
import products from "./mock_data/product.json"


describe('Test Mock PriceCalculator', () => {
    const mockCurrency = new PriceCalculator()
    mockCurrency.storeArr = stores
    mockCurrency.currency = { "buying": buying, "custom": custom }

    const productUSD = products[0]
    const storeUSD = stores[0]

    const productGBP = products[1]
    const storeGBP = stores[1]

    it('get priceWithoutTax', () => {
        // got 39.99 => want 33.33
        const taxReducedPrice = mockCurrency.priceWithoutTax(productUSD, storeUSD)
        expect(taxReducedPrice).toStrictEqual(33.325)
    })
    it('get korProductPrice', () => {
        const korProductPrice = mockCurrency.korProductPrice(productUSD)
        expect(korProductPrice).toStrictEqual(44900)
    })
    it('get isIntlFreeDelivery', () => {
        // storeUSD 200 | storeGBP 0
        const case1 = mockCurrency.isIntlFreeDelivery(200, storeUSD)
        const case2 = mockCurrency.isIntlFreeDelivery(199.90, storeUSD)
        const case3 = mockCurrency.isIntlFreeDelivery(200, storeGBP)
        expect(case1).toBe(true)
        expect(case2).toBe(false)
        expect(case3).toBe(false)
    })
    it('get intlDeliveryPrice', () => {
        const DeliveryFee = mockCurrency.intlDeliveryPrice(productUSD, storeUSD)
        expect(DeliveryFee).toStrictEqual(25)
    })
    it('get KorIntlDeliveryPrice', () => {
        const DeliveryFee = mockCurrency.korIntlDeliveryPrice(productUSD)
        expect(DeliveryFee).toStrictEqual(33700)
    })
    it('get convertCustomUSD as USD', () => {
        const CustomUSD = mockCurrency.convertCustomUSD(productUSD, storeUSD)
        expect(CustomUSD).toStrictEqual(33.325)
    })
    it('get convertCustomUSD as GBP ', () => {

        const CustomUSD = mockCurrency.convertCustomUSD(productGBP, storeGBP)
        expect(CustomUSD).toStrictEqual(42.34)
    })
    it('get custumDuty ', () => {
        const case1 = mockCurrency.isCustomDuty(149.98, storeGBP)
        const case2 = mockCurrency.isCustomDuty(150, storeGBP)
        const case3 = mockCurrency.isCustomDuty(150, storeUSD)
        const case4 = mockCurrency.isCustomDuty(200, storeUSD)
        expect(case1).toBe(false)
        expect(case2).toBe(true)
        expect(case3).toBe(false)
        expect(case4).toBe(true)
    })




})
