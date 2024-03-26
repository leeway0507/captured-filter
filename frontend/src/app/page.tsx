import React from 'react';
import getData from './components/fetch/fetch';
import { ProductProps, FilterResponseProps } from './type';
import Table from './components/product-table/table';
import buildUrl from './components/fetch/build-url';

export const dynamic = 'force-dynamic';

type SearchParamsProps = {
  page: string,
  filter: string,
};

export default async function Home({ searchParams }:
{ searchParams:SearchParamsProps }) {
  const url = buildUrl('product', searchParams);
  const prodData = await getData<FilterResponseProps<ProductProps>>(url);
  return (
    <div className="relative max-w-[1660px] w-[100%] mx-auto h-full pt-[40px]">
      <Table prodData={prodData} />
    </div>
  );
}
