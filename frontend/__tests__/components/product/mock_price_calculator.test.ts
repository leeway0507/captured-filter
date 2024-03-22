import 'dotenv/config';
import { PriceCalculator, TaxProps } from '@/app/components/product-table/price-calculator';
import { roundDecimal, roundDigit } from '@/components/table-template/utils';
import buying from './mock_data/buying.json';
import custom from './mock_data/custom.json';
import stores from './mock_data/store.json';
import products from './mock_data/product.json';

describe('Test Mock PriceCalculator', () => {
  const mockCurrency = new PriceCalculator();
  mockCurrency.storeArr = stores;
  mockCurrency.currency = { buying, custom };

  const productUS = products[0];
  const storeUS = stores[0];

  const productUK = products[2];
  const storeUk = stores[1];

  it('check roundDecimal', () => {
    const got = roundDecimal(123.456, 2);
    const want = 123.46;
    expect(got).toStrictEqual(want);
  });

  it('check roundDigit', () => {
    const got = roundDigit(123456, 3);
    const want = 123000;
    expect(got).toStrictEqual(want);
  });

  it('get priceWithoutTax', () => {
    // got 39.99 => want 33.33
    const productPrice = mockCurrency.calcProductPrice(productUS, storeUS);
    expect(productPrice.taxReducedSalePrice).toStrictEqual(33.33);

    const ProductKRWPrice = mockCurrency.toKRWPrice(productPrice.taxReducedSalePrice, 'USD');
    expect(ProductKRWPrice).toStrictEqual(44900);
  });

  it('get intlDeliveryPrice', () => {
    const DeliveryFee = mockCurrency.intlDeliveryPrice(productUS, storeUS.intl_shipping_fee);
    expect(DeliveryFee).toStrictEqual(25);
    const IntlDeliveryKRWPrice = mockCurrency.toKRWPrice(DeliveryFee, 'USD');
    expect(IntlDeliveryKRWPrice).toStrictEqual(33700);
  });

  it('get isIntlFreeDelivery', () => {
    // Free delivery : storeUS 200 | storeUk 0
    const case1 = mockCurrency.isIntlFreeDelivery(200, storeUS.intl_free_shipping_min);
    const case2 = mockCurrency.isIntlFreeDelivery(199.9, storeUS.intl_free_shipping_min);
    const case3 = mockCurrency.isIntlFreeDelivery(200, storeUk.intl_free_shipping_min);
    expect(case1).toBe(true);
    expect(case2).toBe(false);
    expect(case3).toBe(false);
  });

  it('get convertCustomUSD as USD', () => {
    const CustomUSD = mockCurrency.convertCustomUSD(productUS.sale_price, 'USD');
    expect(CustomUSD).toStrictEqual(39.99);
  });

  it('get convertCustomUSD as GBP ', () => {
    const CustomUSD = mockCurrency.convertCustomUSD(productUK.sale_price, 'GBP');
    expect(CustomUSD).toStrictEqual(43.19);
  });

  it('get custumDuty ', () => {
    const case1 = mockCurrency.isCustomDuty(149.98, 'UK');
    const case2 = mockCurrency.isCustomDuty(150, 'UK');
    const case3 = mockCurrency.isCustomDuty(150, 'US');
    const case4 = mockCurrency.isCustomDuty(200, 'US');
    expect(case1).toBe(false);
    expect(case2).toBe(true);
    expect(case3).toBe(false);
    expect(case4).toBe(true);
  });

  it('check return productType', () => {
    const prodctType = mockCurrency.findProductType(productUS);
    expect(prodctType).toHaveProperty('category');
    expect(prodctType).toHaveProperty('categorySpec');
    expect(prodctType).toHaveProperty('consumptionTaxRate');
    expect(prodctType).toHaveProperty('customRate');
    expect(prodctType).toHaveProperty('deliveryStd');
  });

  it('check Product isFTA', () => {
    const testCase = [
      ['US', 'US'],
      ['US', 'UK'],
      ['UK', 'FR'],
      ['IT', 'FR'],
      ['FR', 'KR'],
    ];
    const result = testCase.map((t) => mockCurrency.isFTA(t[0], t[1]));
    expect(result).toStrictEqual([true, false, false, true, false]);
  });

  it('calc ProductPrice', () => {
    // tax_reduction_manually => true
    // 수집한 가격에 세금이 빠져있지 않아 빼야함
    const gotUS = mockCurrency.calcProductPrice(productUS, storeUS);
    const wantUS = {
      currencyCode: 'USD',
      retailPrice: 39.99,
      salePrice: 39.99,
      taxReducedRetailPrice: 33.33,
      taxReducedSalePrice: 33.33,
      RetailKRWPrice: 44900,
      KRWPrice: 44900,
      saleRate: 0,
    };
    expect(gotUS).toStrictEqual(wantUS);
    // tax_reduction_manually => false
    // 수집한 가격에 이미 세금이 빠져있음
    const gotUK = mockCurrency.calcProductPrice(productUK, storeUk);
    const wantUK = {
      currencyCode: 'GBP',
      retailPrice: 39.99,
      salePrice: 33.99,
      taxReducedRetailPrice: 39.99,
      taxReducedSalePrice: 33.99,
      RetailKRWPrice: 68200,
      KRWPrice: 58000,
      saleRate: 0.15,
    };
    expect(gotUK).toStrictEqual(wantUK);
  });

  it('calc IntlDeliveryPrice', () => {
    const got = mockCurrency.calcDeliveryPrice(products.slice(0, 2), storeUS);
    const want = {
      currencyCode: 'USD',
      shippingFee: 30,
      shippingFeePerPrice: 15,
      KRWShippingFee: 40400,
      KRWShippingFeePerPrice: 20200,
      numOfProduct: 2,
      isFreeDelivery: false,
      isCumulative: false,
    };

    expect(got).toStrictEqual(want);
  });

  it('calc Tax', () => {
    const productPrice = mockCurrency.calcProductPrice(productUS, storeUS);
    const deliveryPrice = mockCurrency.calcDeliveryPrice([productUS], storeUS);
    const productType = mockCurrency.findProductType(productUS);
    const got = mockCurrency.calcTax(productPrice, deliveryPrice, productType!, storeUS, 'US');
    const want: TaxProps = {
      customTax: 0,
      VAT: 0,
      consumptionTax: 0,
      isCustomDuty: false,
      totalTax: 0,
      custumUSDPirce: 33.33,
      freeCustomLimit: 200,
    };
    expect(got).toStrictEqual(want);
  });
});
