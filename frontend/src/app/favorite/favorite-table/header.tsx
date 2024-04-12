import {
  createColumnHelper, ColumnDef, SortingFn,
} from '@tanstack/react-table';
import { ProductTableProps } from '@/app/components/product-table/price-calculator';
import * as Cell from '@/app/components/product-table/header-cell';
import * as Col from '@/app/components/product-table/header-col';
import { CostCell, LinkSite, MarginCell } from './header-cell';
import { FavoriteTableProps } from './margin-calculator';

const calcTotalPrice = (row:any) => {
  const productPrice = row.original.productPrice.KRWPrice;
  const deliveryPrice = row.original.delivery.KRWShippingFee;
  const tax = row.original.tax.totalTax;
  return productPrice + deliveryPrice + tax;
};

const testSort:SortingFn<FavoriteTableProps | ProductTableProps> = (rowA, rowB): number => {
  const rA = calcTotalPrice(rowA);
  const rB = calcTotalPrice(rowB);
  if (rA > rB) {
    return -1;
  } if (rA < rB) {
    return 1;
  }
  return 0;
};

const columnHelper = createColumnHelper<FavoriteTableProps | ProductTableProps>();

const SearchColumn : ColumnDef<FavoriteTableProps | ProductTableProps, any>[] = [
  columnHelper.accessor('productInfo.product_id', {
    id: 'Brand',
    header: ({ header }) => <Col.Brand columnName="브랜드" header={header} />,
    cell: (props) => <Cell.Brand props={props} />,
    sortingFn: 'text',
  }),

  columnHelper.accessor('productInfo.product_url', {
    header: '사이트 이동',
    cell: (props) => <LinkSite props={props} />,
    size: 50,
  }),
  columnHelper.accessor('productInfo.product_img_url', {
    header: '제품 이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
    size: 150,
  }),

  columnHelper.accessor('RetailPrice', {
    id: 'productMargin',
    header: '판매가/마진',
    cell: (props) => <MarginCell props={props} />,
    sortingFn: testSort,
  }),
  columnHelper.accessor('cost', {
    id: 'cost',
    header: '비용',
    cell: (props) => <CostCell props={props} className="text-gray-400" />,
  }),
  columnHelper.accessor('VAT', {
    id: 'VAT',
    header: '부가세',
    cell: (props) => <CostCell props={props} className="font-light text-gray-400" />,
  }),
  columnHelper.accessor('storeFee', {
    id: 'storeFee',
    header: '수수료',
    cell: (props) => <CostCell props={props} className="font-light text-gray-400" />,
  }),

  columnHelper.accessor('productInfo.retail_price', {
    id: 'totalPrice',
    header: '제품 구매가',
    cell: (props) => <Cell.TotalPrice props={props} />,
    sortingFn: testSort,
  }),

  columnHelper.accessor('productPrice.KRWPrice', {
    header: () => <Col.DefualtHeader columnName="제품 가격" />,
    cell: (props) => <CostCell props={props} className="font-light text-gray-400" />,
  }),
  columnHelper.accessor('delivery.KRWShippingFee', {
    header: () => <Col.DefualtHeader columnName="배송비" />,
    cell: (props) => <CostCell props={props} className="font-light text-gray-400" />,
  }),
  columnHelper.accessor('tax.totalTax', {
    header: () => <Col.DefualtHeader columnName="관·부가세" />,
    cell: (props) => <CostCell props={props} className="font-light text-gray-400" />,
  }),

  columnHelper.display({
    id: 'customLimitIndicator',
    header: '목록통관',
    size: 200,
    cell: (props) => <Cell.CustomLimit props={props} />,
  }),

  columnHelper.accessor('storeInfo', {
    header: ({ header }) => <Col.Store columnName="판매 편집샵" header={header} />,
    cell: (props) => <Cell.Store props={props} />,
  }),

];

export default SearchColumn;
