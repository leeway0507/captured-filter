import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ProductTableProps } from './price-calculator';
import * as Cell from './header-cell';
import * as Col from './header-col';

const columnHelper = createColumnHelper<ProductTableProps>();

const ProductColumns : ColumnDef<ProductTableProps, any>[] = [
  columnHelper.display({
    id: 'options',
    header: ({ table }) => <Col.Filter table={table} columnName="필터" />,
    cell: (props) => <Cell.Comparison props={props} />,
  }),

  columnHelper.accessor('productInfo.product_id', {
    id: 'Brand',
    header: ({ column }) => <Col.Brand columnName="브랜드" column={column} />,
    cell: (props) => <Cell.Brand props={props} />,
    enableSorting: false,
  }),

  columnHelper.accessor('productInfo.product_img_url', {
    id: 'image',
    header: '이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
  }),

  columnHelper.display({
    id: 'totalPrice',
    header: '구매가',
    cell: (props) => <Cell.TotalPrice props={props} />,
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

export default ProductColumns;
