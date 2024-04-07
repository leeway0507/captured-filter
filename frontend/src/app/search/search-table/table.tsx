'use client';

import React, { useEffect, useState, Suspense } from 'react';
import ServerTable from '@/components/table-template/server-table';
import NewPriceCalculator, { ProductTableProps } from '@/app/components/product-table/price-calculator';
import SearchColumn from './header';
import { ProductProps, FilterResponseProps } from '../../type';

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

  const initalSorting = [
    {
      id: 'Brand',
      desc: true,

    },
    {
      id: 'totalPrice',
      desc: true,
    },
  ];

  if (tableData === undefined) return null;
  const t = (
    // @ts-ignore
    <ServerTable
      data={tableData}
      columns={SearchColumn}
      pageCount={prodData.lastPage}
      initalSorting={initalSorting}
    />
  );
  return (
    <Suspense fallback={<div />}>
      {t}
    </Suspense>
  );
}

export default Table;
