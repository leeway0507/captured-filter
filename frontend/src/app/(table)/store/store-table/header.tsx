import { createColumnHelper, FilterFn, ColumnDef } from '@tanstack/react-table';

import { StoreTableProps } from './data-preprocessor';
import * as Cell from './header-cell';
import * as Col from './header-col';

const columnHelper = createColumnHelper<StoreTableProps>();

export const yesOrNoFilter: FilterFn<StoreTableProps> = (
  row,
  columnId,
  filterValue,
) => {
  const value = row.getValue(columnId);
  switch (filterValue) {
    case true:
      return value !== undefined;
    case false:
      return value === undefined;
    default:
      return true;
  }
};

const StoreColumn : ColumnDef<StoreTableProps, any>[] = [

  columnHelper.accessor('country', {
    header: ({ column }) => <Col.Country columnName="국가" column={column} />,
    cell: (props) => <Cell.Country props={props} />,
    filterFn: 'arrIncludesSome',
    sortingFn: 'basic',
  }),

  columnHelper.accessor('store_name', {
    header: '스토어',
    cell: (props) => <Cell.Store props={props} />,
  }),

  columnHelper.accessor((original) => (original.tax_reduction > 0), {
    id: 'taxReduction',
    header: ({ column }) => <Col.TaxReduction columnName="부가세 제외" column={column} />,
    cell: (props) => <Cell.TaxReduction props={props} />,
  }),

  columnHelper.accessor('currency', {
    header: '결제 화폐',
    cell: (props) => <Cell.CurrencyCode props={props} />,
  }),

  columnHelper.accessor('intl_shipping_fee', {
    header: () => <Col.DeliveryFee columnName="배송비" />,
    cell: (props) => <Cell.DeliveryFee props={props} />,
    filterFn: 'auto',
  }),

  columnHelper.accessor('intl_free_shipping_min', {
    header: ({ column }) => <Col.FreeDeliveryFeeMin columnName="무료배송" column={column} />,
    cell: (props) => <Cell.FreeDeliveryFeeMin props={props} />,
    filterFn: yesOrNoFilter,
  }),

  columnHelper.accessor('shipping_fee_cumulation', {
    header: ({ column }) => <Col.DeliveryFeeCumulation columnName="배송비 누적" column={column} />,
    cell: (props) => <Cell.YesOrNo props={props} />,
    filterFn: yesOrNoFilter,
  }),

  columnHelper.accessor('ddp', {
    header: ({ column }) => <Col.DDP column={column} />,
    cell: (props) => <Cell.YesOrNo props={props} />,
    filterFn: yesOrNoFilter,
  }),

  columnHelper.accessor('delivery_agency', {
    header: '배송사',
    cell: (props) => <Cell.DeliveryAgency props={props} />,
  }),

];

export default StoreColumn;
