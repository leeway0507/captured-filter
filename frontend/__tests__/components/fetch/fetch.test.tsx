import getData from '@/app/components/fetch/fetch';
import { ProductProps } from '@/app/type';
import 'dotenv/config';

describe('Page', () => {
  it('get product', async () => {
    const result = await getData<ProductProps[]>('product');
    expect(result.length).toBe(50);
  });
});
