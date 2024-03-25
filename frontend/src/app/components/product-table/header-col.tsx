import { useCallback } from 'react';
import { Header } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { components, OptionProps } from 'react-select';
import { SelecFilterDialog } from '../../../components/table-template/client-filter';
import { ProductTableProps } from './price-calculator';
import { CountryToISO2 } from '../meta/country';
import { GetProductFilterMeta } from './hook';

export function Price({ header }: { header: Header<ProductTableProps, any> }) {
  return (
    <Button
      variant="ghost"
      asChild={false}
      onClick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
    >
      최종 가격
    </Button>
  );
}
export function DefualtHeader({ columnName }: { columnName:string }) {
  return <div className="text-center">{columnName}</div>;
}

export type BrandValueProps = {
  value: string,
  label: string,
  imgUrl: string,
};

function BrandOption(props: OptionProps<BrandValueProps>) {
  const { data } = props;

  const renderOption = useCallback(() => (
    <components.Option {...props} className="block">
      <div className="flex items-center gap-2 p-1 cursor-pointer">
        <Avatar>
          <AvatarImage src={data.imgUrl} className="scale-[75%]" />
        </Avatar>
        {data.label}
      </div>
    </components.Option>
  ), [props, data]);

  return renderOption();
}

export function Brand({ header, columnName }:
{ header: Header<ProductTableProps, any>, columnName:string }) {
  const uniqueValues = GetProductFilterMeta();
  if (uniqueValues?.storeName === undefined) return <div>{columnName}</div>;

  const selectValues:BrandValueProps[] = uniqueValues.brand.map((brandName) => ({
    value: brandName,
    label: brandName,
    imgUrl: '/brand/black/adidas-logo.png',
  }))!;
  return (
    <SelecFilterDialog
      uniqueValues={selectValues}
      columnName={columnName}
      header={header}
      option={BrandOption}
    />
  );
}

export type StoreValueProps = {
  value: string,
  label: string,
  korLabel:string,
  imgUrl: string,
  country:string,
  flag:string
};

function StoreOption(props: OptionProps<StoreValueProps>) {
  const { data } = props;

  const renderOption = useCallback(() => (
    <components.Option {...props} className="block">
      <div className="flex items-center justify-between gap-2 p-1 cursor-pointer">
        <div className="flex-center gap-2">
          <Avatar className="border border-black/40 rounded-full">
            <AvatarImage src={data.imgUrl} />
          </Avatar>
          <div className="flex flex-col">
            <div>{data.label.replaceAll('_', ' ')}</div>
            <div className="text-gray-400 text-sm">{data.korLabel}</div>
          </div>
        </div>
        <div className=" text-gray-400">
          {data.country}
          (
          {data.flag}
          )
        </div>
      </div>
    </components.Option>
  ), [props, data]);

  return renderOption();
}

export function Store({ header, columnName }:
{ header: Header<ProductTableProps, any>, columnName:string }) {
  const uniqueValues = GetProductFilterMeta();

  if (uniqueValues?.storeName === undefined) return <div>{columnName}</div>;

  const selectValues:StoreValueProps[] = uniqueValues.storeName.map((store) => ({
    value: store.id,
    label: store.id,
    korLabel: store.kor_id,
    imgUrl: `/store/logo/${store.id}.webp`,
    country: CountryToISO2.find((c) => c.countryCode === store.country)?.countryNameKor!,
    flag: CountryToISO2.find((c) => c.countryCode === store.country)?.flag!,
  }));
  return (
    <SelecFilterDialog<StoreValueProps, ProductTableProps>
      uniqueValues={selectValues}
      columnName={columnName}
      header={header}
      option={StoreOption}
    />
  );
}