import SearchInputMain from '@/app/components/nav/search-input-main';
import { NavDefault } from '@/app/components/nav/main';
import getData from '../components/fetch/fetch';
import { ProductProps, FilterResponseProps } from '../type';
import Table from './product/table';
import buildUrl from '../components/fetch/build-url';

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
    <>
      <NavDefault flexableDiv />
      <div className="w-full flex justify-center pt-6 pb-10">
        <SearchInputMain />
      </div>
      <div className="grow flex items-start justify-start">
        <Table prodData={prodData} />
      </div>
    </>
  );
}
