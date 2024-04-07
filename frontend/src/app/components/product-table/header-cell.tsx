import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ExternalLinkIcon, ArrowDownIcon,
} from '@radix-ui/react-icons';
import Progress from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { toast } from 'sonner';
import { useState } from 'react';
import { encodeHex, decodeHex } from '@/lib/utils';
import { CountryToISO2 } from '../meta/country';
import {
  customHoverCard, KRW, USD, MaxLengthToolTip, CURR,
} from '../../../components/table-template/utils';
import { ProductTableProps } from './price-calculator';
import BrandLogoImage from '../brand_logo/logo';

function getFavoriteIdList(): Array<number> {
  // av_i = favoriteId
  const s = localStorage.getItem('av_i');
  return s ? JSON.parse(decodeHex(s)) : new Array<number>();
}

function removeFavoriteIdList(rowId:number) {
  const d = getFavoriteIdList();
  const removedList = d.filter((i) => i !== rowId);
  const encodedString = encodeHex(JSON.stringify(removedList));
  localStorage.setItem('av_i', encodedString);
}
function addFavoriteIdList(rowId:number) {
  const d = getFavoriteIdList();
  const isExisted = d.find((i) => i === rowId);
  if (!isExisted) {
    const encodedString = encodeHex(JSON.stringify([...d, rowId]));
    localStorage.setItem('av_i', encodedString);
  }
}

function getFavoriteList():
Array<ProductTableProps> | null {
  const s = localStorage.getItem('f_rd');
  return s && JSON.parse(decodeHex(s));
}

function addFavorite(props: CellContext<ProductTableProps, any>) {
  const data = props.row.original;
  const rowId = props.row.original.productInfo.id;

  const favoriteList = getFavoriteList();
  if (favoriteList) {
    const isExisted = favoriteList.find((r) => r.productInfo.id === rowId);
    if (!isExisted) {
      const saveFile = JSON.stringify([data, ...favoriteList]);
      const encodedString = encodeHex(saveFile);
      // f_rd = favorite
      localStorage.setItem('f_rd', encodedString);
      addFavoriteIdList(rowId);
    }
  } else {
    const saveFile = JSON.stringify([data]);
    const encodedString = encodeHex(saveFile);
    localStorage.setItem('f_rd', encodedString);
    addFavoriteIdList(rowId);
  }
}
function removeFavorite(props: CellContext<ProductTableProps, any>) {
  const favoriteList = getFavoriteList();
  if (favoriteList) {
    const rowId = props.row.original.productInfo.id;
    const removedFavoriteList = favoriteList.filter((r) => r.productInfo.id !== rowId);
    const saveFile = JSON.stringify(removedFavoriteList);
    const encodedString = encodeHex(saveFile);
    localStorage.setItem('f_rd', encodedString);
    removeFavoriteIdList(rowId);
  }
}

export function Favorite({ props }: { props: CellContext<ProductTableProps, any> }) {
  const [favoriteId, setFavoriteIdList] = useState(() => getFavoriteIdList());
  const rowId = props.row.original.productInfo.id!;

  const addFavoriteId = () => {
    if (!favoriteId.includes(rowId)) {
      setFavoriteIdList((l) => [...l, rowId]);
    }
  };
  const removeFavoriteId = () => {
    setFavoriteIdList(favoriteId.filter((l) => l !== rowId));
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const productId = props.row.original.productInfo.product_id!;
    if (checked) {
      addFavorite(props);
      addFavoriteId();
      toast.success(`즐겨찾기에 추가했습니다. : ${productId}`);
    } else {
      removeFavorite(props);
      removeFavoriteId();
      toast.success(`즐겨찾기에서 제거했습니다. : ${productId}`);
    }
  };

  const ischecked = favoriteId.includes(rowId);
  return (
    <label htmlFor={`${rowId}`} className="bg-accent cursor-pointer py-2 flex-center gap-1 rounded-md">
      <span>즐겨찾기</span>
      <input
        className="star"
        type="checkbox"
        id={`${rowId}`}
        onChange={onChangeHandler}
        checked={ischecked}
      />
    </label>

  );
}

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
  const copyHandler = () => {
    if (productId) {
      navigator.clipboard.writeText(productId);
      toast(`제품 아이디를 복사했습니다. : ${productId}`);
    }
  };

  return (
    <div className="flex-center flex-col gap-1">
      <BrandLogoImage brandName={brand} />
      <div className="uppercase flex-col text-xs">
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
  const prodId = props.row.original.productInfo.product_id;
  const searchUrl = new URL(`/search?q=${prodId}`, window.location.href);

  return (
    <div className="flex flex-col gap-2">
      <Button variant="secondary" className="font-medium" asChild>
        <Link href={searchUrl.href} target="_blank" rel="noreferrer" className="flex-center gap-1">
          제품검색
          <ExternalLinkIcon className="w-3 h-3" />
        </Link>
      </Button>
      <Favorite props={props} />
    </div>
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
  const priceRaw = props.row.original.productPrice;
  const retail = priceRaw.RetailKRWPrice;
  const sale = priceRaw.KRWPrice;
  const { saleRate } = priceRaw;
  const taxOjb = props.row.original.tax;
  const salePercentFormat = saleRate.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
  const cell = retail === sale ? <div className="underline">{KRW(sale)}</div>
    : (
      <>
        <div className="text-gray-400 line-through">{KRW(retail)}</div>
        <div>
          <span className="underline">
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
      <div>관세 기준</div>
      <div>{USD(taxOjb.freeCustomLimit)}</div>
      <div>물품 관세가</div>
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
