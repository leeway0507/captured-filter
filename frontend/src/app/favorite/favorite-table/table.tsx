'use client';

import React, { useEffect, useState, Suspense } from 'react';
import ServerTable from '@/components/table-template/server-table';
import { decodeHex } from '@/lib/utils';
import { ProductTableProps } from '@/app/components/product-table/price-calculator';
import SearchColumn from './header';
import {
  RetailPriceOptions,
  FavoriteOptionsProps,
  LoadFavoritePersonalOption,
  InitialOptions,
  SaveFavoritePersonalOption,
} from './options';
import NoFavorite from './no-result';
import MarginCalculator, { FavoriteTableProps } from './margin-calculator';

function Table() {
  const [tableData, setTableData] = useState<FavoriteTableProps[] | null>();
  const [options, setOptions] = useState<FavoriteOptionsProps>();
  const marginCalculator = new MarginCalculator();

  useEffect(() => {
    const s = localStorage.getItem('f_rd');
    const favoliteData:ProductTableProps[] | null = s && JSON.parse(decodeHex(s));

    const data = LoadFavoritePersonalOption();
    const FavoriteOptions = data || InitialOptions;
    setOptions(FavoriteOptions);

    setTableData(favoliteData ? marginCalculator.execute(favoliteData, FavoriteOptions) : null);
  }, []);

  useEffect(() => {
    if (options !== undefined) {
      SaveFavoritePersonalOption(options);
      const s = localStorage.getItem('f_rd');
      const favoliteData:ProductTableProps[] | null = s && JSON.parse(decodeHex(s));

      setTableData(favoliteData ? marginCalculator.execute(favoliteData, options) : null);
    }
  }, [options]);

  if (tableData === undefined) return null;
  if (options === undefined) return null;
  if (tableData === null || tableData?.length === 0) return <NoFavorite />;
  const t = (
    // @ts-ignore
    <ServerTable
      data={tableData}
      columns={SearchColumn}
      pageCount={1}
    />
  );
  return (
    <>
      <RetailPriceOptions defaultOptions={options} setResultOptions={setOptions} />
      <Suspense fallback={<div />}>
        {t}
      </Suspense>
    </>
  );
}

export default Table;
