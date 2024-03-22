'use client';

import React, { useEffect, useState } from 'react';
import TableLayout from './table-layout';
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
  // @ts-ignore
  return <TableLayout data={tableData} columns={ProductColumns} pageCount={prodData.lastPage} />;
}

export default Table;
