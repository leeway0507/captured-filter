'use client';

import React, {
  useEffect, useState, Suspense,
} from 'react';
import ServerTableFixed from '@/app/(table)/components/server-table-fixed';
import { decodeHex } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DevProductTableProps } from '../../(dev-table)/dev-price-calculator';
import SearchColumn from './header';
import { useDevFavorite } from '../../(dev-table)/context';

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
  const [tableData, setTableData] = useState<DevProductTableProps[] | null>();
  const { getFavoriteOptions } = useDevFavorite();
  const columnPin = [{
    id: 'ProductImage',
    start: 0,
    zindex: 10,
  },
  {
    id: 'productMargin',
    start: 205,
    zindex: 0,
  },
  ];

  useEffect(() => {
    if (!getFavoriteOptions) return;

    const s = localStorage.getItem('dev_f_rd');
    const favoliteData:DevProductTableProps[] | null = s && JSON.parse(decodeHex(s));

    setTableData(favoliteData ?? null);
  }, [getFavoriteOptions]);

  if (tableData === undefined) return null;
  if (getFavoriteOptions === undefined) return null;
  if (tableData === null || tableData?.length === 0) return <NoFavorite />;

  return (
    <Suspense fallback={<div />}>
      <ServerTableFixed
        data={tableData}
        columns={SearchColumn}
        pageCount={1}
        columnPin={columnPin}
      />
    </Suspense>
  );
}

export default Table;
