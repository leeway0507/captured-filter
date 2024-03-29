import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from '@radix-ui/react-icons';
import Progress from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { CountryToISO2 } from '../meta/country';
import {
  customHoverCard, KRW, USD, MaxLengthToolTip,
} from '../../../components/table-template/utils';
import { ProductTableProps } from './price-calculator';

export function ProductImage({ props }: { props: CellContext<ProductTableProps, any> }) {
  const isSale = props.row.original.productPrice.saleRate > 0;
  const url = props.row.original.productInfo.product_url;
  const cell = (
    <Link href={url} target="_blank" rel="noreferrer" className="group">
      <div className="relative h-[110px] aspect-square mx-auto hover:border border-gray-400 hover:opacity-80 cursor-zoom-in group">
        <div className="z-10 absolute inset-0 h-full flex-center group-hover:visible invisible">사이트 이동</div>
        {isSale ? <div className="text-red-500 rounded-full py-0.5 px-1 absolute top-0 right-0 z-10 text-xs font-bold">SALE</div> : null}
        <Image
          src={props.getValue()}
          alt={props.row.original.productInfo.product_name}
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}

        />
      </div>
    </Link>
  );

  const hoverCell = (
    <div className="flex-col bg-white max-w-[400px] border border-gray-300">
      <div className="relative aspect-square w-[300px] mx-auto z-50">
        <Image
          src={props.getValue()}
          alt={props.row.original.productInfo.product_name}
          fill
          unoptimized
          style={{ objectFit: 'contain' }}
          className="z-50"
        />
      </div>
      <div className="text-lg border-t border-gray-300 whitespace-normal">{props.row.original.productInfo.product_name}</div>

    </div>
  );
  return customHoverCard(cell, hoverCell, 'right', 100, true);
}

export function Brand({ props }: { props: CellContext<ProductTableProps, any> }) {
  const { brand, kor_brand: korBrand, product_id: productId } = props.row.original.productInfo;
  return (
    <div className="flex-center gap-2">
      <Avatar>
        <AvatarImage src={`/brand/black/${brand}-logo.png`} className="scale-[75%]" />
      </Avatar>
      <div className="uppercase flex-col">
        <div>
          {korBrand}

        </div>
        <div className="text-gray-400 text-xs max-w-[60px] truncate">
          <MaxLengthToolTip inputString={productId} />
        </div>
      </div>
    </div>
  );
}

export function Store({ props }: { props: CellContext<ProductTableProps, any> }) {
  const store = props.row.original.storeInfo;
  const country = CountryToISO2.find((c) => c.countryCode === store.country);

  return (
    <div className="flex items-start gap-2 ">
      <Avatar>
        <AvatarImage className="border border-black/40 rounded-full" src={`/store/logo/${store.store_name}.webp`} />
      </Avatar>
      <div className="uppercase flex flex-col justify-start items-start">
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
    </div>

  );
}

export function Comparison({ props }: { props: CellContext<ProductTableProps, any> }) {
  const prodId = props.row.original.productInfo.product_id;
  const searchUrl = new URL(`/search?q=${prodId}`, window.location.href);

  return (
    <Button variant="secondary" className="font-medium" asChild>
      <Link href={searchUrl.href} target="_blank" rel="noreferrer">비교하기</Link>
    </Button>
  );
}

export function TotalPrice({ props }: { props: CellContext<ProductTableProps, any> }) {
  const productPrice = props.row.original.productPrice.KRWPrice;
  const deliveryPrice = props.row.original.delivery.KRWShippingFee;
  const tax = props.row.original.tax.totalTax;
  const totalPrice = productPrice + deliveryPrice + tax;
  const cell = (
    <div className="flex flex-col">
      <div className="font-medium">{KRW(totalPrice)}</div>
    </div>
  );

  return cell;
}

export function ProductPrice({ props }: { props: CellContext<ProductTableProps, any> }) {
  const retail = props.row.original.productPrice.RetailKRWPrice;
  const sale = props.row.original.productPrice.KRWPrice;
  const { saleRate } = props.row.original.productPrice;
  const salePercentFormat = saleRate.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
  const cell = retail === sale ? KRW(sale)
    : (
      <>
        <div className="text-gray-400 line-through">{KRW(retail)}</div>
        <div>
          {KRW(sale)}
          <div className="text-red-500  w-full text-xs">
            (
            <ArrowDownIcon className="inline" />
            {salePercentFormat}
            )
          </div>
        </div>
      </>
    );
  // const hoverCell = <div>hello</div>;

  return cell;
}

export function Delivery({ props }: { props: CellContext<ProductTableProps, any> }) {
  const cell = KRW(props.getValue());
  // const hoverCell = <div>hello</div>;

  return cell;
}

export function Tax({ props }: { props: CellContext<ProductTableProps, any> }) {
  const taxOjb = props.row.original.tax;
  const cell = <div className="underline">{KRW(taxOjb.totalTax)}</div>;
  const green = <div className="rounded-full bg-green-500 w-2 h-2" />;
  const red = <div className="rounded-full bg-red-500 w-2 h-2" />;

  const hoverCell = (
    <div className="grid grid-cols-2">
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
      <div>무료 관세 기준</div>
      <div>{USD(taxOjb.freeCustomLimit)}</div>
      <div>물품 관세가 환전</div>
      <div>{USD(taxOjb.custumUSDPirce)}</div>
    </div>
  );

  return customHoverCard(cell, hoverCell, 'right');
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
    <div className="h-[50px]">
      <div className="h-[40%]" />
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

export function DeliveryAgency({ props }: { props: CellContext<ProductTableProps, any> }) {
  const agency = props.row.original.storeInfo.delivery_agency;
  return (
    <div className="flex-center gap-2 ">
      <Avatar>
        <AvatarImage src={`/delivery_agency/${agency}.webp`} />
      </Avatar>

      <div className="uppercase text-xs">{agency}</div>
    </div>
  );
}
