import { createColumnHelper } from '@tanstack/react-table';
import { DeliveryAgency } from '@/app/store/store-table/header-cell';
import { ProductTableProps } from './price-calculator';
import * as Cell from './header-cell';
import * as Col from './header-col';

const columnHelper = createColumnHelper<ProductTableProps>();

const ProductColumns = [
  columnHelper.accessor('productInfo.product_id', {
    header: ({ header }) => <Col.Brand columnName="브랜드" header={header} />,
    cell: (props) => <Cell.Brand props={props} />,
  }),

  columnHelper.accessor('productInfo.product_img_url', {
    header: '제품 이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
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
    cell: (props) => <Cell.CustomLimit props={props} />,
  }),

  columnHelper.accessor('storeInfo', {
    header: ({ header }) => <Col.Store columnName="판매 편집샵" header={header} />,
    cell: (props) => <Cell.Store props={props} />,
  }),

  columnHelper.accessor('productInfo.product_url', {
    header: '구매하기',
    cell: (props) => <Cell.Buy props={props} />,
  }),

  columnHelper.accessor('storeInfo.delivery_agency', {
    header: '배송사',
    cell: (props) => <DeliveryAgency<ProductTableProps> props={props} />,
  }),

];

export default ProductColumns;
