import { createColumnHelper, FilterFn } from '@tanstack/react-table';

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

const StoreColumn = [

  columnHelper.accessor('store_name', {
    header: '스토어',
    cell: (props) => <Cell.Store props={props} />,
  }),
  columnHelper.accessor('country', {
    header: ({ header }) => <Col.Country columnName="국가" header={header} />,
    cell: (props) => <Cell.Country props={props} />,
    filterFn: 'arrIncludesSome',
  }),
  columnHelper.accessor((original) => (original.tax_reduction > 0), {
    id: 'taxReduction',
    header: ({ header }) => <Col.TaxReduction columnName="현지 부가세 제외" header={header} />,
    cell: (props) => <Cell.TaxReduction props={props} />,
  }),
  columnHelper.accessor('currency', {
    header: '결제 화폐',
    // header: ({ header }) => <Col.CurrencyCode header={header} />,
    cell: (props) => <Cell.CurrencyCode props={props} />,
  }),
  columnHelper.accessor('intl_shipping_fee', {
    header: () => <Col.DeliveryFee columnName="배송비" />,
    cell: (props) => <Cell.DeliveryFee props={props} />,
    filterFn: 'auto',
  }),
  columnHelper.accessor('intl_free_shipping_min', {
    header: ({ header }) => <Col.FreeDeliveryFeeMin columnName="무료배송" header={header} />,
    cell: (props) => <Cell.FreeDeliveryFeeMin props={props} />,
    filterFn: yesOrNoFilter,
  }),
  columnHelper.accessor('shipping_fee_cumulation', {
    header: ({ header }) => <Col.DeliveryFeeCumulation columnName="배송비 누적" header={header} />,
    cell: (props) => <Cell.YesOrNo props={props} />,
    filterFn: yesOrNoFilter,
  }),
  columnHelper.accessor('ddp', {
    header: ({ header }) => <Col.DDP header={header} />,
    cell: (props) => <Cell.YesOrNo props={props} />,
    filterFn: yesOrNoFilter,
  }),
  columnHelper.accessor('delivery_agency', {
    header: '배송사',
    cell: (props) => <Cell.DeliveryAgency props={props} />,
  }),

];

export default StoreColumn;
