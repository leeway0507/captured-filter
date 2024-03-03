export type ResponseProps<T> = {
  status: number
  data: T
}

export type ProductProps = {
  id: number
  store_name: string
  brand: string
  product_name: string
  product_img_url: string
  product_url: string
  currency_code: string
  retail_price: number
  sale_price: number
  product_id: string
  kor_brand?: string
  kor_product_name?: string
  color?: string
  gender?: string
  category?: string
  category_spec?: string
  sold_out: boolean
  updated_at: string
}

type IntlShippingFee = {
  Heavy: number
  Light: number
  Shoes: number
}

export type StoreProps = {
  id: string
  url: string
  country: string
  currency: string
  tax_reduction: number
  intl_shipping_fee: IntlShippingFee
  intl_free_shipping_fee: number
  domestic_shipping_fee: number
  domestic_free_shipping_fee: number
  shipping_fee_cumulation: boolean
  delivery_agency: string
  broker_fee: boolean
  ddp: boolean
  updated_at: string
}

type CurrProps = {
  Update: string
  Data: { [key: string]: number }
}

export type CurrencyProps = {
  buying: CurrProps
  custom: CurrProps
}
