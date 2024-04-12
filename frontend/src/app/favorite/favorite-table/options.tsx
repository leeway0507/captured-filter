'use client';

import { useState } from 'react';
import { encodeHex, decodeHex } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MixerVerticalIcon } from '@radix-ui/react-icons';

export type FavoriteOptionsProps = {
  margin :number
  storeFee :number
  VAT :number
};
export function RetailPriceOptions({ defaultOptions, setResultOptions }:
{ defaultOptions:FavoriteOptionsProps, setResultOptions: (v:FavoriteOptionsProps)=>void }) {
  const [options, setOptions] = useState<FavoriteOptionsProps>(defaultOptions);
  const confirmHandler = () => setResultOptions(options);

  return (
    <Dialog>
      <div className="flex items-center gap-2 pb-2">
        <DialogTrigger asChild>
          <Button variant="default" asChild={false} size="xs">
            <MixerVerticalIcon />
            <div className="text-xs ms-1 me-1">필터</div>
          </Button>
        </DialogTrigger>
        <div className="flex gap-2 text-sm">
          <div>
            <span className="me-2">마진율</span>
            <span>
              {defaultOptions.margin}
              %
            </span>
          </div>
          <div>
            <span className="me-2">수수료</span>
            <span>
              {defaultOptions.storeFee}
              %
            </span>
          </div>
          <div>
            <span className="me-2">부가세</span>
            <span>
              {defaultOptions.VAT}
              %
            </span>
          </div>
        </div>
      </div>
      <DialogContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <DialogTitle className="font-medium leading-none">판매가 산출</DialogTitle>
            <p className="text-sm text-muted-foreground">
              판매가 산출을 위한 정보를 입력하세요.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label className="col-span-3" htmlFor="width">마진율(%)</Label>
              <Input
                id="margin"
                defaultValue={options?.margin}
                className="col-span-2 h-8"
                type="number"
                min="0"
                onChange={(e) => {
                  const newOptions: FavoriteOptionsProps = {
                    ...options, // assuming `options` is your current state
                    margin: Number(e.target.value),
                  };
                  setOptions(newOptions);
                }}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label className="col-span-3" htmlFor="height">수수료(%)</Label>
              <Input
                id="storeFee"
                type="number"
                min="0"
                defaultValue={options?.storeFee}
                onChange={(e) => {
                  const newOptions: FavoriteOptionsProps = {
                    ...options, // assuming `options` is your current state
                    storeFee: Number(e.target.value),
                  };
                  setOptions(newOptions);
                }}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label className="col-span-3" htmlFor="maxHeight">부가세(%)</Label>
              <Input
                id="VAT"
                type="number"
                min="0"
                defaultValue={options?.VAT}
                onChange={(e) => {
                  const newOptions: FavoriteOptionsProps = {
                    ...options, // assuming `options` is your current state
                    VAT: Number(e.target.value),
                  };
                  setOptions(newOptions);
                }}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full gap-2 p-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" asChild={false} className="px-6">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button asChild={false} className="px-6" onClick={confirmHandler}>확인</Button>
          </DialogClose>
        </div>
      </DialogContent>
      <div />
    </Dialog>
  );
}
export function SaveFavoritePersonalOption(options:FavoriteOptionsProps) {
  // favorite options fos
  const favoriteOptionsKey = encodeHex('fos');
  const mobileWarningValue = JSON.stringify(options);
  localStorage.setItem(favoriteOptionsKey, encodeHex(mobileWarningValue));
}

export function LoadFavoritePersonalOption() {
  const favoriteOptionsKey = encodeHex('fos');
  const favoriteOptionsState = localStorage.getItem(favoriteOptionsKey);
  const mobileWarningValue: FavoriteOptionsProps | null = favoriteOptionsState
              && JSON.parse(decodeHex(favoriteOptionsState));
  return mobileWarningValue;
}

export const InitialOptions = {
  margin: 10,
  cardFee: 0,
  storeFee: 0,
  VAT: 0,
};
