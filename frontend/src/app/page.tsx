import React from 'react';
import { getData } from './components/fetch/fetch';
import { ProductProps } from './type';
import Table from './components/product/table';

export default async function Home() {
  const prodData = await getData<ProductProps[]>('product');
  return <Table prodData={prodData} />;
}
