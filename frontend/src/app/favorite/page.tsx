import React from 'react';
import Table from './favorite-table/table';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <div className="relative max-w-[1660px] w-[100%] mx-auto h-full ">
      <div className="flex-center text-2xl py-4 ">즐겨찾기</div>
      <Table />
    </div>
  );
}
