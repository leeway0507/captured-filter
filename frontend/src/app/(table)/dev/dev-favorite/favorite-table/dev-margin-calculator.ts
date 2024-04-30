import { ProductTableProps } from '@/app/(table)/product/price-calculator';
import { FavoriteOptionsProps } from './options';

export interface FavoriteTableProps extends ProductTableProps {
  RetailPrice:number
  commission:number
  VAT:number
  cost:number
}

export default class DevMarginCalculator {
  ProductPrice!: number;
  favoriteOptions!: FavoriteOptionsProps;

  execute(props: ProductTableProps[], favoriteOptions:FavoriteOptionsProps): FavoriteTableProps[] {
    return props.map((r) => this.calcAll(r, favoriteOptions));
  }
  calcAll(props: ProductTableProps, favoriteOptions:FavoriteOptionsProps): FavoriteTableProps {
    // Y 판매가 X 구매가 a 수수료(%) b 부가세(%) c 마진율(%)
    // 수수료 계산 = aY,부가세 계산 = (Y-X-aY)*b
    this.calcTotalPrice(props);
    this.favoriteOptions = favoriteOptions;
    const RetailPrice = this.calcRetailPrice();
    const commission = this.calcStoreFee(RetailPrice);
    const VAT = this.calcVATFee(RetailPrice - (this.ProductPrice + commission));
    const cost = this.ProductPrice + commission + VAT;

    return {
      ...props, RetailPrice, commission, VAT, cost,
    };
  }

  calcTotalPrice(props:ProductTableProps) {
    const productPrice = props.productPrice.KRWPrice;
    const deliveryInfo = props.deliveryInfo.KRWShippingFee;
    const numberOfProducts = this.favoriteOptions.numOfProduct;
    const tax = props.tax.totalTax;
    this.ProductPrice = productPrice + (deliveryInfo / numberOfProducts) + tax;
  }

  calcRetailPrice():number {
    // Y 판매가 X 구매가 a 수수료(%) b 부가세(%) c 마진율(%)
    // 수수료 계산 = aY,부가세 계산 = (Y-X-aY)*b
    // Y = (X + aY +(Y-X-aY)*b)*c
    // Y = ((1-b)/(1/c)-a+(a-1)b)X
    const a = this.favoriteOptions.commission / 100;
    const b = this.favoriteOptions.VAT / 100;
    const c = 1 + this.favoriteOptions.margin / 100;

    const numerator = (1 - b);
    const denominator = ((1 / c) - a + (a - 1) * b);
    return (numerator / denominator) * this.ProductPrice;
  }

  calcStoreFee(ProductPrice:number) {
    return this.favoriteOptions.commission !== 0
      ? ProductPrice * (this.favoriteOptions.commission / 100) : 0;
  }

  calcVATFee(price:number) {
    return this.favoriteOptions.VAT !== 0
      ? price * (this.favoriteOptions.VAT / 100) : 0;
  }
}
