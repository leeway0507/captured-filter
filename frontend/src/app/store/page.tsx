import React from 'react';
import getData from '../components/fetch/fetch';
import { StoreProps } from '../type';
import StoreTable from './store-table/table';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const storeData = await getData<StoreProps[]>('store');
  return (
    <div className="pt-[20px]">
      <StoreTable storeData={storeData} />
    </div>
  );
}
