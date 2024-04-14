'use client';

import React, { useState, useEffect, Suspense } from 'react';
import ServerTable from '@/app/(table)/components/server-table-fixed';
import StoreColumn from './header';
import { StoreProps } from '../../../type';
import NewPreprocessor, { StoreTableProps } from './data-preprocessor';

async function createTableData(storeData: StoreProps[]): Promise<StoreTableProps[]> {
  const Preprocessor = await NewPreprocessor();
  return storeData.map((p) => Preprocessor.Preprocess(p));
}

function StoreTable({ storeData }: { storeData: StoreProps[] }) {
  const [tableData, setTableData] = useState<StoreTableProps[]>();

  useEffect(() => {
    const calcPrice = async () => {
      const data: StoreTableProps[] = await createTableData(storeData);
      setTableData(data);
    };
    calcPrice();
  }, [storeData]);

  if (tableData === undefined) return null;
  return (
    <Suspense fallback={<div>x</div>}>
      <ServerTable
        data={tableData}
        columns={StoreColumn}
        pageCount={1}
        initalSorting={[{
          id: 'country',
          desc: true,
        }]}
      />
    </Suspense>
  );
}

export default StoreTable;
