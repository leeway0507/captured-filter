import {
  createColumnHelper, ColumnDef, SortingFn,
} from '@tanstack/react-table';
import { ProductTableProps } from '@/app/(table)/product/price-calculator';
import * as Cell from '@/app/(table)/product/header-cell';
import * as Col from '@/app/(table)/product/header-col';
import LinkSite from './header-cell';

const calcTotalPrice = (row:any) => {
  const productPrice = row.original.productPrice.KRWPrice;
  const deliveryPrice = row.original.delivery.KRWShippingFee;
  const tax = row.original.tax.totalTax;
  return productPrice + deliveryPrice + tax;
};

const customSort:SortingFn<ProductTableProps> = (rowA, rowB): number => {
  const rA = calcTotalPrice(rowA);
  const rB = calcTotalPrice(rowB);
  if (rA > rB) {
    return -1;
  } if (rA < rB) {
    return 1;
  }
  return 0;
};

const columnHelper = createColumnHelper<ProductTableProps>();

const SearchColumn : ColumnDef<ProductTableProps, any>[] = [
  columnHelper.accessor('productInfo.product_url', {
    id: 'options',
    header: ({ table }) => <Col.Filter table={table} columnName="필터" />,
    cell: (props) => <LinkSite props={props} />,
  }),

  columnHelper.accessor('productInfo.product_id', {
    id: 'Brand',
    header: ({ column }) => <Col.Brand columnName="브랜드" column={column} />,
    cell: (props) => <Cell.Brand props={props} />,
    sortingFn: 'text',
  }),

  columnHelper.accessor('productInfo.product_img_url', {
    header: '이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
  }),

  columnHelper.accessor('productInfo.retail_price', {
    id: 'totalPrice',
    header: '구매가',
    cell: (props) => <Cell.TotalPrice props={props} />,
    sortingFn: customSort,
  }),

  columnHelper.accessor('productPrice.KRWPrice', {
    header: () => <Col.DefualtHeader columnName="가격" />,
    cell: (props) => <Cell.ProductPrice props={props} />,
  }),

  columnHelper.accessor('delivery.KRWShippingFee', {
    header: () => <Col.DefualtHeader columnName="배송비" />,
    cell: (props) => <Cell.Delivery props={props} />,
  }),

  columnHelper.accessor('tax.totalTax', {
    header: () => <Col.DefualtHeader columnName="관·부가세" />,
    cell: (props) => <Cell.Tax props={props} />,
  }),

  columnHelper.accessor('storeInfo', {
    header: ({ column }) => <Col.Store columnName="판매 편집샵" column={column} />,
    cell: (props) => <Cell.Store props={props} />,
  }),

];

export default SearchColumn;
