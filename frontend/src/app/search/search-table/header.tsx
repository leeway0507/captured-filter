import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ProductTableProps } from '@/app/components/product-table/price-calculator';
import * as Cell from '@/app/components/product-table/header-cell';
import * as Col from '@/app/components/product-table/header-col';
import LinkSite from './header-cell';

const columnHelper = createColumnHelper<ProductTableProps>();

const SearchColumn : ColumnDef<ProductTableProps, any>[] = [
  columnHelper.accessor('productInfo.product_id', {
    id: 'brand',
    header: ({ header }) => <Col.Brand columnName="브랜드" header={header} />,
    cell: (props) => <Cell.Brand props={props} />,
    sortDescFirst: true,
    sortingFn: 'text',
  }),

  columnHelper.accessor('productInfo.product_img_url', {
    header: '제품 이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
    size: 150,
  }),

  columnHelper.accessor('productInfo.product_url', {
    header: '사이트 이동',
    cell: (props) => <LinkSite props={props} />,
    size: 50,
  }),

  columnHelper.display({
    id: 'Price',
    header: ({ header }) => <Col.Price header={header} />,
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
    size: 200,
    cell: (props) => <Cell.CustomLimit props={props} />,
  }),

  columnHelper.accessor('storeInfo', {
    size: 250,
    header: ({ header }) => <Col.Store columnName="판매 편집샵" header={header} />,
    cell: (props) => <Cell.Store props={props} />,
  }),

];

export default SearchColumn;
