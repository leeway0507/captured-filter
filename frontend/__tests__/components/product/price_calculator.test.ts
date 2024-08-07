import 'dotenv/config';
import NewPriceCalculator from '@/app/(table)/product/price-calculator';

describe('Test PriceCalculator Init', () => {
  it('get store', async () => {
    const calc = await NewPriceCalculator();
    expect(calc.storeArr.length).toBeGreaterThanOrEqual(1);
  });

  it('get currency', async () => {
    const calc = await NewPriceCalculator();
    expect(Object.keys(calc.currency)).toStrictEqual(['buying', 'custom']);
  });
});
