import { HTMLAttributes } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ExternalLinkIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import Progress from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { toast } from 'sonner';
import cn from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CountryToISO2 } from '../../components/meta/country';
import {
  customHoverCard, KRW, USD, MaxLengthToolTip, CURR,
} from '../components/utils';
import { ProductTableProps } from './price-calculator';
import BrandLogoImage from '../../components/brand_logo/logo';
import Favorite from './favorite-cell';

type ProductTableCellProps = HTMLAttributes<HTMLDivElement> & {
  props: CellContext<ProductTableProps | ProductTableProps, any>;
};

export function ProductImage({ props }: { props: CellContext<ProductTableProps, any> }) {
  const url = props.row.original.productInfo.product_url;
  const cell = (
    <Link href={url} target="_blank" rel="noreferrer" className="group sticky left-0 -z-1">
      <div className="relative h-[200px] aspect-square mx-auto hover:border border-gray-400 hover:opacity-80 cursor-zoom-in group">
        <div className="z-10 absolute inset-0 h-full flex-center group-hover:visible invisible">사이트 이동</div>
        <Image
          src={props.getValue()}
          alt={props.row.original.productInfo.product_name}
          fill
          unoptimized
          className="scale-[85%]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </Link>
  );

  const hoverCell = (
    <div className="flex-col max-w-[400px] border bg-white z-50">
      <div className="relative aspect-square w-[300px] mx-auto">
        <Image
          src={props.getValue()}
          alt={props.row.original.productInfo.product_name}
          fill
          unoptimized
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="text-base p-2 border-t border-gray-300 whitespace-normal">{props.row.original.productInfo.product_name}</div>

    </div>
  );
  return customHoverCard(cell, hoverCell, 'right', 100, true);
}

export function Brand({ props }: { props: CellContext<ProductTableProps, any> }) {
  const { brand, kor_brand: korBrand, product_id: productId } = props.row.original.productInfo;
  const copyHandler = () => {
    if (productId) {
      navigator.clipboard.writeText(productId);
      toast(`제품 아이디를 복사했습니다. : ${productId}`);
    }
  };

  return (
    <div className="flex-center flex-col gap-1 text-sm">
      <BrandLogoImage brandName={brand} />
      <div className="uppercase flex-col ">
        {brand}
        <div className="text-gray-400">
          <span className="ps-1">
            {korBrand}
            ｜
          </span>
          <button type="button" className="text-gray-400 max-w-[60px] truncate" onClick={copyHandler} aria-label="ProductID">
            <MaxLengthToolTip inputString={productId?.toUpperCase()} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Store({ props }: { props: CellContext<ProductTableProps, any> }) {
  const store = props.row.original.storeInfo;
  const country = CountryToISO2.find((c) => c.countryCode === store.country);
  const cell = (

    <div className="text-sm capitalize flex flex-col justify-start items-center">
      <div>{store.store_name.replaceAll('_', ' ')}</div>
      <div className="text-gray-400">
        {store.kor_store_name}
        ￨
        {country!.countryNameKor}
        (
        {country!.flag}
        )
      </div>
    </div>
  );
  const hoverCell = (
    <div className="grid grid-cols-2 gap-2">
      <div>부가세 제외</div>
      <div>
        {store.tax_reduction ? store.tax_reduction.toLocaleString(
          undefined,
          { style: 'percent', minimumFractionDigits: 0 },
        ) : '아니요'}
      </div>
      <div>무료배송</div>
      <div>{store.intl_free_shipping_min ? CURR(store.intl_free_shipping_min, store.currency) : '아니요'}</div>
      <div>배송비 누적</div>
      <div>{store.shipping_fee_cumulation ? '예' : '아니요'}</div>
      <div>DDP</div>
      <div>{store.ddp ? '예' : '아니요'}</div>

    </div>
  );

  return customHoverCard(cell, hoverCell, 'left');
}

export function Comparison({ props }: { props: CellContext<ProductTableProps, any> }) {
  const { product_id: prodId, product_name: prodName } = props.row.original.productInfo;
  const SearchQueryParam = !prodId || prodId === '-' ? prodName : prodId;
  const searchUrl = new URL(`/search?q=${SearchQueryParam}`, window.location.href);

  return (
    <div className="flex-center flex-col gap-2">
      <Link href={searchUrl.href} target="_blank" rel="noreferrer">
        <Button variant="outline" asChild={false} className="gap-1 ">
          검색
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      </Link>
      <Favorite props={props} />
    </div>
  );
}

export function TotalPrice({ props, ...rest }: ProductTableCellProps) {
  const productPrice = props.row.original.productPrice.KRWPrice;
  const deliveryPrice = props.row.original.delivery.KRWShippingFee;
  const tax = props.row.original.tax.totalTax;
  const totalPrice = productPrice + deliveryPrice + tax;
  const cell = (
    <div {...rest} className={cn('flex flex-col', rest.className)}>
      {KRW(totalPrice)}
    </div>
  );

  return cell;
}

export function ProductPrice({ props }: { props: CellContext<ProductTableProps, any> }) {
  const priceRaw = props.row.original.productPrice;
  const retail = priceRaw.RetailKRWPrice;
  const sale = priceRaw.KRWPrice;
  const { saleRate } = priceRaw;
  const taxOjb = props.row.original.tax;
  const salePercentFormat = saleRate.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
  const cell = retail === sale ? <div className="text-gray-400 underline ">{KRW(sale)}</div>
    : (
      <>
        <div className="text-gray-200 line-through">{KRW(retail)}</div>
        <div>
          <span className="text-gray-400 underline">
            {KRW(sale)}
          </span>
          <div className="text-red-500  w-full text-xs">
            (
            <ArrowDownIcon className="inline" />
            {salePercentFormat}
            )
          </div>
        </div>
      </>
    );

  const hoverCell = (
    <div className="grid gap-2">
      <div className="flex gap-2 justify-between">
        <div>판매가(현지)</div>
        <div>{CURR(priceRaw.retailPrice, priceRaw.currencyCode)}</div>
      </div>
      <div className={`flex gap-2 justify-between ${priceRaw.currencyCode === 'KRW' && 'hidden'}`}>
        <div>부가세제외</div>
        <div>{CURR(priceRaw.taxReducedRetailPrice, priceRaw.currencyCode)}</div>
      </div>
      <div className={`flex gap-2 justify-between ${priceRaw.currencyCode === 'KRW' && 'hidden'}`}>
        <div>판매가(한화)</div>
        <div>{KRW(sale)}</div>
      </div>
      <div className="flex gap-2 justify-between">
        <div>판매가(달러)</div>
        <div>{USD(taxOjb.custumUSDPirce)}</div>
      </div>
    </div>
  );

  return customHoverCard(cell, hoverCell, 'right');
}

export function Delivery({ props }: { props: CellContext<ProductTableProps, any> }) {
  const cell = KRW(props.getValue());
  return <div className="text-gray-400 ">{cell}</div>;
}

export function CustomLimit({ props }: { props: CellContext<ProductTableProps, any> }) {
  const customOjb = props.row.original.tax;
  const customGap = (customOjb.freeCustomLimit - customOjb.custumUSDPirce);
  const customLimitGauge = (customOjb.custumUSDPirce / customOjb.freeCustomLimit) * 100;
  let progressColor;
  let textColor;
  switch (true) {
    case customLimitGauge! >= 100:
      progressColor = 'bg-gray-200';
      textColor = 'text-black';
      break;
    case customLimitGauge! >= 90:
      progressColor = 'bg-red-500';
      textColor = 'text-red-500';
      break;
    case customLimitGauge! >= 80:
      progressColor = 'bg-yellow-500';
      textColor = 'text-yellow-500';
      break;
    default:
      progressColor = 'bg-green-500';
      textColor = 'text-green-600';
  }

  return (
    <div className="h-[50px] my-auto min-w-[100px] w-full">
      {/* <div className="h-[40%]" /> */}
      <Progress value={customLimitGauge} className={progressColor} />
      <div className="text-xs flex justify-between">
        <div>{USD(0)}</div>
        <div>{USD(customOjb.freeCustomLimit)}</div>
      </div>
      <div className={`text-xs ${textColor}`}>
        {USD(Math.abs(customGap))}
        {customGap > 0 ? ' 여유' : ' 초과'}
      </div>
    </div>
  );
}

export function Tax({ props }: { props: CellContext<ProductTableProps, any> }) {
  const taxOjb = props.row.original.tax;
  const cell = <div className="text-gray-400 underline">{KRW(taxOjb.totalTax)}</div>;
  const green = <div className="rounded-full bg-green-500 w-2 h-2" />;
  const red = <div className="rounded-full bg-red-500 w-2 h-2" />;

  const hoverCell = (
    <div className="grid grid-cols-2 w-full">
      <div>FTA 여부</div>
      <div className="flex-center">{taxOjb.IsFTA ? green : red }</div>
      <div>관세</div>
      <div>{KRW(taxOjb.customTax)}</div>
      <div>부가세</div>
      <div>{KRW(taxOjb.VAT)}</div>
      <div>소비세</div>
      <div>{KRW(taxOjb.consumptionTax)}</div>
      <div>관세사 선임료</div>
      <div>{KRW(taxOjb.brokerFee || 0)}</div>
      <div>관세 기준</div>
      <div>{USD(taxOjb.freeCustomLimit)}</div>
      <div>물품 관세가</div>
      <div>{USD(taxOjb.custumUSDPirce)}</div>
      <div className="flex-center col-span-2 pt-2"><CustomLimit props={props} /></div>
    </div>
  );

  return customHoverCard(cell, hoverCell, 'right');
}

export function DeliveryAgency({ agency }: { agency: string }) {
  return (
    <div className="flex items-center gap-2 ">
      <Avatar className="w-6 h-6">
        <AvatarImage src={`/delivery_agency/${agency}.webp`} />
      </Avatar>
      <div className="uppercase text-xs">{agency}</div>
    </div>
  );
}
