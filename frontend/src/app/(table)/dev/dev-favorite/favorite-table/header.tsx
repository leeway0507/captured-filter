import {
  createColumnHelper, ColumnDef,
} from '@tanstack/react-table';
import * as Col from '@/app/(table)/product/header-col';
import * as Cell from '../../(dev-table)/header-cell';
import Filter from '../../(dev-table)/header-filter-col';
import { DevProductTableProps } from '../../(dev-table)/dev-price-calculator';

const columnHelper = createColumnHelper<DevProductTableProps>();

const SearchColumn : ColumnDef<DevProductTableProps, any>[] = [
  columnHelper.accessor('productInfo.product_url', {
    id: 'options',
    header: () => <Filter />,
    cell: (props) => <Cell.Comparison props={props} />,
  }),

  columnHelper.accessor('productInfo.product_id', {
    id: 'Brand',
    header: ({ column }) => <Col.Brand columnName="브랜드" column={column} />,
    cell: (props) => <Cell.Brand props={props} />,
  }),

  columnHelper.accessor('productInfo.product_img_url', {
    id: 'ProductImage',
    header: '이미지',
    cell: (props) => <Cell.ProductImage props={props} />,
  }),

  columnHelper.accessor('sellingInfo.retailPrice', {
    id: 'productMargin',
    header: '판매가/마진',
    cell: (props) => <Cell.MarginCell props={props} />,
  }),

  columnHelper.accessor('sellingInfo.cost', {
    id: 'cost',
    header: '총 비용',
    cell: (props) => <Cell.CostCell props={props} className="font-light text-gray-400" />,
  }),

  columnHelper.accessor((row) => row.sellingInfo.DVAT + row.sellingInfo.commission, {
    id: 'commission',
    header: '기타',
    cell: (props) => <Cell.CostCell props={props} className="font-light text-gray-400" />,
  }),
  columnHelper.accessor('productInfo.retail_price', {
    id: 'expense',
    header: '물품비',
    cell: (props) => <Cell.TotalPrice props={props} className="font-light " />,
  }),

  columnHelper.accessor('productPrice.KRWPrice', {
    header: '물품비 상세',
    cell: (props) => <Cell.ProductPrice props={props} />,
  }),
  columnHelper.accessor('storeInfo', {
    id: 'store',
    header: ({ column }) => <Col.Store columnName="판매 편집샵" column={column} />,
    cell: (props) => <Cell.Store props={props} />,
  }),

];

export default SearchColumn;
