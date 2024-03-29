'use client';

import React, { useEffect, useState, Suspense } from 'react';
import ServerTable from '@/components/table-template/server-table';
import ProductColumns from './header';
import { ProductProps, FilterResponseProps } from '../../type';
import NewPriceCalculator, { ProductTableProps } from './price-calculator';

async function createTableData(prodData: ProductProps[]): Promise<ProductTableProps[]> {
  const priceCalculator = await NewPriceCalculator();

  return prodData.map((p) => {
    const calc = priceCalculator.calcAll(p);
    return { ...calc };
  });
}

function Table({ prodData }: { prodData: FilterResponseProps<ProductProps> }) {
  const [tableData, setTableData] = useState<ProductTableProps[]>();

  useEffect(() => {
    const calcPrice = async () => {
      const data: ProductTableProps[] = await createTableData(prodData.data);
      setTableData(data);
    };
    calcPrice();
  }, [prodData]);

  if (tableData === undefined) return null;
  const t = (
    // @ts-ignore
    <ServerTable
      data={tableData}
      columns={ProductColumns}
      pageCount={prodData.lastPage}
    />
  );
  return (
    <Suspense fallback={<div>x</div>}>
      {t}
    </Suspense>
  );
}

export default Table;
