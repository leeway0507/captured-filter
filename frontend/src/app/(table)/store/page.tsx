import React from 'react';
import { NavDefault } from '@/app/components/nav/main';
import getData from '../../components/fetch/fetch';
import { StoreProps } from '../../type';
import StoreTable from './store-table/table';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const storeData = await getData<StoreProps[]>('store');
  return (
    <>
      <NavDefault />
      <StoreTable storeData={storeData} />
    </>
  );
}
