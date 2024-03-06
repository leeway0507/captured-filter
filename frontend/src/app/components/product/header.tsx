import { createColumnHelper } from '@tanstack/react-table'
import { ProductTableProps } from './table'
import { Button } from "@/components/ui/button"
import * as Col from './header_utils'

const columnHelper = createColumnHelper<ProductTableProps>()

const ProductColumns = [
  columnHelper.accessor('productInfo.product_img_url', {
    header: '이미지(경로)',
    cell: (props) => <Col.ProductImageCell props={props} />
  }),
  columnHelper.accessor("productInfo.product_url", {
    header: "판매 사이트",
    cell: (props) => <Col.StoreSiteCell props={props} />
  }),

  columnHelper.display({
    id: "Price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          가격(예상)
        </Button>
      )
    },
    cell: (props) => <Col.TotalPriceCell props={props} />
  }),
  columnHelper.accessor('productPrice.KRWPrice', {
    "header": '물품비(예상)',
    cell: props => <Col.ProductPriceCell props={props} />
  }),
  columnHelper.accessor('delivery.KRWShippingFee', {
    "header": '배송비(예상)',
    cell: props => { return <div>{Col.KRW(props.getValue())}</div> }
  }),
  columnHelper.accessor('tax.totalTax', {
    "header": '관•부가세(예상)',
    cell: props => <Col.TaxCell props={props} />
  }),
  columnHelper.display({
    "id": 'customLimitIndicator',
    "header": '목록통관',
    cell: props => <Col.CustomLimitCell props={props} />
  }),
  columnHelper.accessor('storeInfo.delivery_agency', {
    "header": '배송사',
    cell: props => <Col.DeliveryCell props={props} />
  }),

]

export default ProductColumns
