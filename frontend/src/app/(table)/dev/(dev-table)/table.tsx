'use client';

import React, { useEffect, useState, Suspense } from 'react';
import ServerTable from '@/app/(table)/components/server-table';
import ProductColumns from './header';
import { ProductProps, FilterResponseProps } from '../../../type';
import NewDevPriceCalculator, { DevProductTableProps } from './dev-price-calculator';
import { useDevFavorite } from './context';
import { FavoriteOptionsProps } from '../dev-favorite/favorite-table/options';

async function CreateTableData(data: ProductProps[], FavoriteOption:FavoriteOptionsProps):
Promise<DevProductTableProps[]> {
  if (!FavoriteOption) {
    return [];
  }
  const DevPriceCalculator = await NewDevPriceCalculator(FavoriteOption);

  return data.map((p) => {
    const devData = DevPriceCalculator.calcAll(p);
    return { ...devData };
  });
}

function Table({ prodData }: { prodData: FilterResponseProps<ProductProps> }) {
  const [tableData, setTableData] = useState<DevProductTableProps[]>();
  const { getFavoriteOptions } = useDevFavorite();

  useEffect(() => {
    const calcPrice = async () => {
      const data: DevProductTableProps[] = prodData.data
        ? await CreateTableData(prodData.data, getFavoriteOptions!)
        : [];
      setTableData(data);
    };
    calcPrice();
  }, [prodData, getFavoriteOptions]);

  if (getFavoriteOptions === undefined) return null;
  if (tableData === undefined) return null;
  return (
    <Suspense fallback={<div />}>
      <ServerTable
        data={tableData}
        columns={ProductColumns}
        pageCount={prodData.lastPage}
      />
    </Suspense>
  );
}

export default Table;
