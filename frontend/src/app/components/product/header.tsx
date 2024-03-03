import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { ProductProps } from '@/app/type'

const columnHelper = createColumnHelper<ProductProps>()

const ProductColumns = [
  columnHelper.accessor('store_name', {
    header: '사이트명',
  }),
  columnHelper.accessor('brand', {
    header: '브랜드',
  }),
  columnHelper.accessor('product_name', {
    header: '제품명',
  }),
  columnHelper.accessor('retail_price', {
    header: '정가',
  }),
  columnHelper.accessor('sale_price', {
    header: '할인가',
  }),
  columnHelper.accessor('updated_at', {
    header: '업데이트일',
  }),
  columnHelper.accessor('product_url', {
    header: '링크',
  }),
]

export default ProductColumns
