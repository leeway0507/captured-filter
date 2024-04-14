import React, { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { ProductTableProps } from '@/app/(table)/product/price-calculator';
import { KRW } from '@/app/(table)/components/utils';
import Favorite from '../../product/favorite-cell';
import { FavoriteTableProps } from './margin-calculator';

type FavoriteCellProps = HTMLAttributes<HTMLDivElement> & {
  props: CellContext<FavoriteTableProps | ProductTableProps, any>;
};

export function LinkSite({ props }: { props: CellContext<ProductTableProps, any> }) {
  const url = props.row.original.productInfo.product_url;
  return (
    <div className="flex flex-col gap-2">
      <Button variant="secondary" className="font-medium" asChild>
        <Link href={url} target="_blank" rel="noreferrer">사이트 이동</Link>
      </Button>
      <Favorite props={props} />
    </div>
  );
}
export function MarginCell({ props, ...rest }: FavoriteCellProps) {
  const price = props.getValue();
  let cost;
  if ('cost' in props.row.original) {
    cost = props.row.original.cost;
  }
  return (
    <div {...rest}>
      <div>{KRW(price)}</div>
      <div className="text-green-600 text-xs pt-1">
        (
        {KRW(price - cost!)}
        )
      </div>
    </div>
  );
}

export function CostCell({ props, ...rest }: FavoriteCellProps) {
  const price = props.getValue();
  return (
    <div {...rest}>
      {KRW(price)}
    </div>
  );
}
