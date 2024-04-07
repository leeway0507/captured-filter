import { useCallback } from 'react';
import { Header } from '@tanstack/react-table';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { components, OptionProps } from 'react-select';
import { SelecFilterDialog } from '../../../components/table-template/client-filter';
import { ProductTableProps } from './price-calculator';
import { CountryToISO2 } from '../meta/country';
import { GetProductFilterMeta } from './hook';
import BrandLogoImage from '../brand_logo/logo';

export function DefualtHeader({ columnName }: { columnName:string }) {
  return <div className="text-center">{columnName}</div>;
}

export type BrandValueProps = {
  value: string,
  label: string,
};

function BrandOption(props: OptionProps<BrandValueProps>) {
  const { data } = props;
  const renderOption = useCallback(() => (
    <components.Option {...props} className="block">
      <div className="flex items-center gap-2 p-1 cursor-pointer">
        <BrandLogoImage brandName={data.value} />
        {data.label}
      </div>
    </components.Option>
  ), [props, data]);

  return renderOption();
}

export function Brand({ header, columnName }:
{ header: Header<ProductTableProps, any>, columnName:string }) {
  const productFilter = GetProductFilterMeta();
  if (productFilter?.storeName === undefined) return <div>{columnName}</div>;

  const selectValues:BrandValueProps[] = productFilter.brand.map((brandName) => ({
    value: brandName,
    label: brandName,
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
      <div className="flex items-center justify-between gap-2 px-1 py-2 cursor-pointer">
        <div className="flex-center gap-2">
          <Avatar className="border border-black/40 rounded-full">
            <AvatarImage src={data.imgUrl} />
          </Avatar>
          <div className="flex flex-col">
            <div>{data.label.replaceAll('_', ' ')}</div>
            <div className="text-gray-400 text-xs">{data.korLabel}</div>
          </div>
        </div>
        <div className=" text-gray-400 text-sm">
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
  const productFilter = GetProductFilterMeta();

  if (productFilter?.storeName === undefined) return <div>{columnName}</div>;

  const selectValues:StoreValueProps[] = productFilter.storeName.map((store) => ({
    value: store.store_name,
    label: store.store_name,
    korLabel: store.kor_store_name,
    imgUrl: `/store/logo/${store.store_name}.webp`,
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
