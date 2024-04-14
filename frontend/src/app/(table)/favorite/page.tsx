import React from 'react';
import { NavDefault } from '@/app/components/nav/main';
import Table from './favorite-table/table';
import FavoriteContext from './context';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <>
      <NavDefault />
      <FavoriteContext>
        <Table />
      </FavoriteContext>
    </>
  );
}
