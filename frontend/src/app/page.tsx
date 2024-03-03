import React from 'react';
import DefaultTable from './components/table_template/table';
import { getData } from './components/fetch/fetch';
import ProductColumns from './components/product/header';
import { ProductProps } from './type';

export default async function Home() {
  const prodData = await getData<ProductProps[]>('product');
  // @ts-ignore
  return <DefaultTable data={prodData} columns={ProductColumns} />;
}
