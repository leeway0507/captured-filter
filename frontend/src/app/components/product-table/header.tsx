import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ProductTableProps } from './price-calculator';
import * as Cell from './header-cell';
import * as Col from './header-col';

const columnHelper = createColumnHelper<ProductTableProps>();

const ProductColumns : ColumnDef<ProductTableProps, any>[] = [
  columnHelper.accessor('productInfo.product_url', {
    header: '',
    cell: (props) => <Cell.Comparison props={props} />,
    size: 50,
  }),
  columnHelper.accessor('productInfo.product_img_url', {
    id: 'image',
    header: '제품 이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
    size: 150,
  }),
  columnHelper.accessor('productInfo.product_id', {
    id: 'Brand',
    header: ({ header }) => <Col.Brand columnName="브랜드" header={header} />,
    cell: (props) => <Cell.Brand props={props} />,
    enableSorting: false,
  }),

  columnHelper.display({
    id: 'totalPrice',
    header: '최종 가격',
    cell: (props) => <Cell.TotalPrice props={props} />,
  }),

  columnHelper.accessor('productPrice.KRWPrice', {
    header: () => <Col.DefualtHeader columnName="제품 가격" />,
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

  columnHelper.display({
    id: 'customLimitIndicator',
    header: '목록통관',
    cell: (props) => <Cell.CustomLimit props={props} />,
    size: 200,
  }),

  columnHelper.accessor('storeInfo', {
    header: ({ header }) => <Col.Store columnName="판매 편집샵" header={header} />,
    cell: (props) => <Cell.Store props={props} />,
    size: 250,
  }),

];

export default ProductColumns;
