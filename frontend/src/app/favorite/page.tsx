import React from 'react';
import Table from './favorite-table/table';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <div className="pt-[50px]">
      <Table />
    </div>
  );
}
