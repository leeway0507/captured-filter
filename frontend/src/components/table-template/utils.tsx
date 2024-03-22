import React, { ReactElement } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export function KRW(price: number) {
  return new Intl.NumberFormat('kr-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
}
export function USD(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
export function CURR(price: number, curr:string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: curr,
  }).format(price);
}
export function roundDecimal(x: number, decimal: number): number {
  const n = 10 ** decimal;
  return Math.round(x * n) / n;
}
export function roundDigit(x: number, digit: number): number {
  const n = 10 ** digit;
  return Math.round(x / n) * n;
}

export function customHoverCard(
  cell: ReactElement | string,
  hoverCell: ReactElement | string,
  side: 'top' | 'right' | 'bottom' | 'left' = 'bottom',
  delay: number = 200,
) {
  return (
    <HoverCard openDelay={delay} closeDelay={100}>
      <HoverCardTrigger className="cursor-pointer hover:opacity-80">{cell}</HoverCardTrigger>
      <HoverCardContent className="z-50 bg-white p-2" side={side}>
        {hoverCell}
      </HoverCardContent>
    </HoverCard>
  );
}

export function QuestionToolTip({ hoverCell }:{ hoverCell: ReactElement | string }) {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger className="cursor-pointer hover:opacity-80">
        <InfoCircledIcon className="w-3 h-3" />
      </HoverCardTrigger>
      <HoverCardContent className="max-w-[300px] z-50 bg-white p-2 font-light text-muted-foreground whitespace-normal text-start">
        {hoverCell}
      </HoverCardContent>
    </HoverCard>
  );
}
