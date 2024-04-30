'use client';

import {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';
import {
  FavoriteOptionsProps,
  LoadFavoritePersonalOption,
} from '../dev-favorite/favorite-table/options';

export const InitialOptions = {
  margin: 10,
  commission: 0,
  numOfProduct: 5,
  VAT: 0,
};

interface ShoppingCartContextProps {
  getFavoriteOptions:FavoriteOptionsProps | undefined
  setFavoriteOptions:(v:FavoriteOptionsProps)=>void
}

const devFavoriteContext = createContext({} as ShoppingCartContextProps);

export function useDevFavorite() {
  return useContext(devFavoriteContext);
}

export default function FavoriteContext({ children }: { children: React.ReactNode }) {
  const [favoriteOptions, setFavoriteOptions] = useState<FavoriteOptionsProps>();

  useEffect(() => {
    const data = LoadFavoritePersonalOption();
    const FavoriteOptions = data || InitialOptions;
    setFavoriteOptions(FavoriteOptions);
  }, []);

  const value = useMemo(() => ({
    getFavoriteOptions: favoriteOptions,
    setFavoriteOptions,
  }), [favoriteOptions, setFavoriteOptions]);

  return (
    <devFavoriteContext.Provider value={value}>
      {children}
    </devFavoriteContext.Provider>
  );
}
