import React from 'react';
import Table from './search-table/table';
import getData from '../components/fetch/fetch';
import { ProductProps, SearchResponseProps } from '../type';
import buildUrl from '../components/fetch/build-url';

export const dynamic = 'force-dynamic';

type SearchParamsProps = {
  q :string
};

export default async function Page({ searchParams }:
{ searchParams:SearchParamsProps }) {
  const url = buildUrl('product/search', searchParams);
  const prodData = await getData<SearchResponseProps<ProductProps>>(url);
  const t = searchParams.q.length > 20
    ? `${searchParams.q.slice(0, 20)}...`
    : searchParams.q;

  return (
    <div className="relative max-w-[1660px] w-[100%] mx-auto h-full ">
      <div className="h-[100px] flex-center text-2xl">
        {t}
        에 대한 검색 결과
      </div>
      {prodData && prodData.data ? <Table prodData={prodData} /> : <div className="flex-center text-2xl">검색 결과가 없습니다.</div>}
    </div>
  );
}
