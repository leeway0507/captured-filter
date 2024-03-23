import React from 'react';
import getData from '../components/fetch/fetch';
import { StoreProps } from '../type';
import StoreTable from './store-table/table';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const storeData = await getData<StoreProps[]>('store');
  return (
    <div className="relative max-w-[1660px] w-full mx-auto h-full pt-[50px]">
      <StoreTable storeData={storeData} />
    </div>
  );
}
