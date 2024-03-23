'use client';

import React, { useState, useEffect, Suspense } from 'react';
import TableLayout from './table-layout';
import StoreColumn from './header';
import { StoreProps } from '../../type';
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
  // @ts-ignore
  const tableLayout = <TableLayout<StoreTableProps> data={tableData} columns={StoreColumn} />;
  return (
    <Suspense fallback={<div>x</div>}>
      {tableLayout}
    </Suspense>
  );
}

export default StoreTable;
