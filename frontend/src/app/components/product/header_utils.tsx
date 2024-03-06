import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ArrowDownIcon } from '@radix-ui/react-icons'
import { Progress } from "@/components/ui/progress"

import Image from 'next/image'
import { CellContext } from '@tanstack/react-table'
import { ProductTableProps } from './table'
import { CountryToISO2 } from './meta'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ReactElement } from 'react'

export function KRW(price: number) {
    return new Intl.NumberFormat("kr-KR", {
        style: "currency",
        currency: "KRW",
    }).format(price)
}
export function USD(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price)
}

function customHoverCard(cell: ReactElement | string, hoverCell: ReactElement | string) {

    return < HoverCard openDelay={200} >
        <HoverCardTrigger className='font-medium cursor-pointer hover:opacity-80'>{cell}</HoverCardTrigger>
        <HoverCardContent>
            {hoverCell}
        </HoverCardContent>
    </HoverCard >
}

export function DeliveryCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const agent = props.getValue()
    return <>
        <div className=' my-auto h-full '>
            <div className='relative h-[30px] mx-auto mb-2'>
                <Image
                    src={`./delivery_agency/${agent}.svg`}
                    alt={agent}
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className='uppercase text-xs'>{agent}</div>
        </div>
    </>
}
export function TotalPriceCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const productPrice = props.row.original.productPrice.KRWPrice
    const deliveryPrice = props.row.original.delivery.KRWShippingFee
    const tax = props.row.original.tax.totalTax
    const totalPrice = productPrice + deliveryPrice + tax
    const hoverCell = <div>hello</div>
    const cell = KRW(totalPrice)

    return customHoverCard(cell, hoverCell)

}
export function StoreSiteCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const store = props.row.original.storeInfo
    const flag = CountryToISO2.find(c => c.countryCode === store.country)?.flag
    return (
        <>
            <div className='uppercase pb-2'>{store.id}({flag})</div>
            <Button variant="secondary" className='font-medium' asChild>
                <Link href={props.getValue()} target="_blank" rel="noreferrer">이동하기</Link>
            </Button>
        </>
    )


}
export function ProductImageCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const isSale = props.row.original.productPrice.saleRate > 0
    return <Link href={props.row.original.productInfo.product_url} className='hover:opacity-80'>
        <div className='relative aspect-square w-[150px] mx-auto'>
            {isSale ? <div className='text-red-500 rounded-full py-0.5 px-1 absolute top-1 right-1 z-50 text-sm font-bold'>SALE</div> : <></>}
            <Image
                src={props.getValue()}
                alt={props.row.original.productInfo.product_name}
                fill
                style={{ objectFit: "contain" }}
            />
        </div>
    </Link>
}


export function ProductPriceCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const retail = props.row.original.productPrice.RetailKRWPrice
    const sale = props.row.original.productPrice.KRWPrice
    const saleRate = props.row.original.productPrice.saleRate
    const salePercentFormat = saleRate.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 })
    const cell = retail === sale ? KRW(sale) :
        <>
            <div className='text-gray-400 line-through'>{KRW(retail)}</div >
            <div>
                {KRW(sale)}
                <div className='text-red-500  w-full text-xs'>
                    (
                    <ArrowDownIcon className='inline' />
                    {salePercentFormat}
                    )
                </div >
            </div>
        </>
    const hoverCell = <div>hello</div>

    return customHoverCard(cell, hoverCell)
}

export function TaxCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const customOjb = props.row.original.tax
    const cell = KRW(customOjb.totalTax)
    const 목록통관 = !customOjb.isCustomDuty
    const priceGap = (customOjb.freeCustomLimit - customOjb.custumUSDPirce)
    const priccRate = (customOjb.custumUSDPirce / customOjb.freeCustomLimit)


    const 통관여유가격셀 = <>
        <div className='text-sm text-green-600'>
            {USD(Math.abs(priceGap))}
        </div>

    </>
    const hoverCell = <div className='flex-col items-center'>
        <div className='pb-2'>목록통관기준</div>
        <div className='w-full'>
            <Progress value={priccRate * 100} className='w-full' />
            <div className='text-xs flex justify-between'>
                <div>{USD(0)}</div>
                <div>{USD(customOjb.freeCustomLimit)}</div>
            </div>
            {통관여유가격셀}
        </div>
    </div>

    return customHoverCard(cell, hoverCell)
}

export function CustomLimitCell({ props }: { props: CellContext<ProductTableProps, any> }) {
    const customOjb = props.row.original.tax
    const priceGap = (customOjb.freeCustomLimit - customOjb.custumUSDPirce)
    const priccRate = (customOjb.custumUSDPirce / customOjb.freeCustomLimit) * 100
    const progressColor = `${priccRate! >= 90 ? "bg-red-500" : priccRate! >= 80 ? "bg-yellow-500" : "bg-green-500"}`
    const textColor = `${priccRate! >= 90 ? "text-red-500" : priccRate! >= 80 ? "text-yellow-500" : "text-green-500"}`

    return <div className='flex flex-col h-full aspect-[1.2/1]'>
        <div className='h-[42.5%] w-full' />
        <div className='flex-col items-center '>
            <Progress value={priccRate} className={progressColor} />
            <div className='text-xs flex justify-between'>
                <div>{USD(0)}</div>
                <div>{USD(customOjb.freeCustomLimit)}</div>
            </div>
            <div className={`text-xs ${textColor}`}>
                {USD(Math.abs(priceGap))}
                {priceGap > 0 ? " 여유" : " 초과"}

            </div>
        </div>
    </div>

}
