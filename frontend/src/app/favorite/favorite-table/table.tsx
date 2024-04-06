'use client';

import React, { useEffect, useState, Suspense } from 'react';
import ServerTable from '@/components/table-template/server-table';
import { ProductTableProps } from '@/app/components/product-table/price-calculator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { decodeHex } from '@/lib/utils';
import SearchColumn from './header';

function NoFavorite() {
  const router = useRouter();
  return (
    <div className="flex-col flex-center grow py-8 gap-4">
      <span className="text-2xl">즐겨찾기 제품이 없습니다.</span>
      <Button type="button" aria-label="goBack" asChild={false} onClick={router.back}>돌아가기</Button>
    </div>
  );
}

function Table() {
  const [tableData, setTableData] = useState<ProductTableProps[] | null>();

  useEffect(() => {
    const s = localStorage.getItem('f_rd');
    const favoliteData:ProductTableProps[] | null = s && JSON.parse(decodeHex(s));
    setTableData(favoliteData);
  }, []);
  if (tableData === undefined) return null;
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
    <Suspense fallback={<div />}>
      {t}
    </Suspense>
  );
}

export default Table;
