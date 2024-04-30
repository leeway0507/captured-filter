import SearchInputMain from '@/app/components/nav/search-input-main';
import { NavDefault } from '@/app/components/nav/main';
import getData from '@/app/components/fetch/fetch';
import buildUrl from '@/app/components/fetch/build-url';
import { ProductProps, FilterResponseProps } from '../../../type';
import Table from './table';
import FavoriteContext from './context';

export const dynamic = 'force-dynamic';

type SearchParamsProps = {
  page: string,
  filter: string,
  sale:string,
};

export async function generateMetadata({ searchParams }:{ searchParams:SearchParamsProps }) {
  return {
    title: searchParams.sale ? '세일' : '실험',
  };
}

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
      <FavoriteContext>
        <div className="grow flex items-start justify-start">
          <Table prodData={prodData} />
        </div>
      </FavoriteContext>
    </>
  );
}
