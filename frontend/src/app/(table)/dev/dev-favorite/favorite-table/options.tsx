'use client';

import { encodeHex, decodeHex } from '@/lib/utils';

export type FavoriteOptionsProps = {
  margin :number
  commission :number
  numOfProduct:number
  VAT :number
};

export function RetailPriceOptions({ defaultOptions }:{ defaultOptions:FavoriteOptionsProps }) {
  return (
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
          {defaultOptions.commission}
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
  );
}

export function SaveFavoritePersonalOption(options:FavoriteOptionsProps) {
  const favoriteOptionsKey = encodeHex('dev_fos'); // favorite options dev_fos
  const mobileWarningValue = JSON.stringify(options);
  localStorage.setItem(favoriteOptionsKey, encodeHex(mobileWarningValue));
}

export function LoadFavoritePersonalOption() {
  const favoriteOptionsKey = encodeHex('dev_fos'); // favorite options dev_fos
  const favoriteOptionsState = localStorage.getItem(favoriteOptionsKey);
  const mobileWarningValue: FavoriteOptionsProps | null = favoriteOptionsState
              && JSON.parse(decodeHex(favoriteOptionsState));
  return mobileWarningValue;
}
