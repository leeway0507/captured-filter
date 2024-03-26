import { createColumnHelper } from '@tanstack/react-table';

import { StoreTableProps } from './data-preprocessor';
import * as Cell from './header-cell';
import * as Col from './header-col';

const columnHelper = createColumnHelper<StoreTableProps>();

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
  columnHelper.accessor('store_url', {
    header: '사이트',
    cell: (props) => <Cell.MoveToSite props={props} />,
  }),
  columnHelper.accessor((original) => (original.tax_reduction > 0), {
    id: 'taxReduction',
    header: ({ header }) => <Col.TaxReduction header={header} />,
    cell: (props) => <Cell.TaxReduction props={props} />,
  }),
  columnHelper.accessor('currency', {
    header: '결제 화폐',
    // header: ({ header }) => <Col.CurrencyCode header={header} />,
    cell: (props) => <Cell.CurrencyCode props={props} />,
  }),
  columnHelper.accessor('intl_shipping_fee', {
    header: () => <Col.DeliveryFee />,
    cell: (props) => <Cell.DeliveryFee props={props} />,
  }),
  columnHelper.accessor('intl_free_shipping_min', {
    header: ({ header }) => <Col.FreeDeliveryFeeMin header={header} />,
    cell: (props) => <Cell.FreeDeliveryFeeMin props={props} />,
  }),
  columnHelper.accessor('shipping_fee_cumulation', {
    header: ({ header }) => <Col.DeliveryFeeCumulation header={header} />,
    cell: (props) => <Cell.YesOrNo props={props} />,
  }),
  columnHelper.accessor('ddp', {
    header: ({ header }) => <Col.DDP header={header} />,
    cell: (props) => <Cell.YesOrNo props={props} />,
  }),
  columnHelper.accessor('delivery_agency', {
    header: () => <div className="w-[200px]">배송사</div>,
    cell: (props) => <Cell.DeliveryAgency props={props} />,
  }),

];

export default StoreColumn;
