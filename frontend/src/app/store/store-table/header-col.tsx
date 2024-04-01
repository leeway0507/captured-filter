import { useMemo, useCallback } from 'react';
import { Header } from '@tanstack/react-table';
import { components, OptionProps } from 'react-select';
import { CountryToISO2, EU } from '@/app/components/meta/country';
import { SelecFilterDialog, YesOrNoFilterDialog, DefaultSelectProps } from '@/components/table-template/client-filter';
import { QuestionToolTip } from '@/components/table-template/utils';
import { StoreTableProps } from './data-preprocessor';

export function FreeDeliveryFeeMin({ header, columnName }:
{ header: Header<StoreTableProps, any>, columnName:string }) {
  const infoCell = '일정 금액 이상 구매 시 무료 배송을 제공하는 쇼핑몰입니다.';
  return <YesOrNoFilterDialog columnName={columnName} infoCell={infoCell} header={header} />;
}
export function TaxReduction({ header, columnName }:
{ header: Header<StoreTableProps, any>, columnName:string }) {
  const infoCell = '한국으로 직배송 시 현지 부가세를 제외한 가격으로 판매하는 편집샵입니다.';
  return <YesOrNoFilterDialog columnName={columnName} infoCell={infoCell} header={header} />;
}

export function DeliveryFee({ columnName }:{ columnName:string }) {
  const infoCell = (
    <div>
      <div>
        해외 직배송 특성 상 상품의 무게, 부피에 따라 배송비가 상이합니다.
      </div>
      <div>·의류1 : 반팔 티셔츠, 모자, 반바지 등 무게가 가벼운 의류</div>
      <div>·의류2 : 자켓, 코트, 부피가 크고 무게가 나가는 의류</div>
      <div>·신발 : 신발 및 신발과 유사한 부피 및 무게가 나가는 상품</div>
    </div>
  );
  return (
    <div className="flex-center gap-1">
      <span>{columnName}</span>
      <QuestionToolTip infoCell={infoCell} />
    </div>
  );
}

export function DeliveryFeeCumulation({ header, columnName }:
{ header: Header<StoreTableProps, any>, columnName:string }) {
  const infoCell = '배송비 누적 편집샵의 경우 주문 상품의 개수에 따라 배송비가 증가합니다.';
  return <YesOrNoFilterDialog columnName={columnName} infoCell={infoCell} header={header} />;
}
export function DDP({ header }: { header: Header<StoreTableProps, any> }) {
  const infoCell = (
    <div>
      DDP(Delivered Duty Paid)을 지원하는 쇼핑몰은 결제 시 관·부가세를 함께 계산합니다.
      별도의 관·부가세 납부 절차를 생략해 편리하지만, 관세 제외조건에 해당하는 상품 구매시에도 예외없이
      관·부가세를 납부해야 하므로 주의해야합니다.
    </div>
  );
  return <YesOrNoFilterDialog columnName="DDP" infoCell={infoCell} header={header} />;
}

interface CountryValueProps extends DefaultSelectProps {
  isEU :boolean
  flag : string

}

function CountryOption(props: OptionProps<CountryValueProps>) {
  const { data } = props;

  const renderOption = useCallback(() => (
    <components.Option {...props} className="block">
      <div className="flex items-center justify-between p-1 cursor-pointer mx-4 py-1">
        <div>
          {data.label}
        </div>
        <div>
          <span className="text-sm text-gray-400">{data.isEU ? 'EU ｜ ' : null}</span>
          <span className="text-xl">{data.flag}</span>
        </div>
      </div>
    </components.Option>
  ), [props, data]);

  return renderOption();
}

export function Country({ header, columnName }:
{ header: Header<StoreTableProps, any>, columnName:string }) {
  const uniqueValues:string[] = useMemo(
    () => Array.from(header.column.getFacetedUniqueValues().keys()).sort(),
    [header.column],
  );
  const selectValues:CountryValueProps[] = uniqueValues.map(((country) => ({
    value: country,
    label: CountryToISO2.find((c) => c.countryCode === country)?.countryNameKor!,
    flag: CountryToISO2.find((c) => c.countryCode === country)?.flag!,
    isEU: EU.has(country),
  })));
  return (
    <SelecFilterDialog<CountryValueProps, StoreTableProps >
      uniqueValues={selectValues}
      columnName={columnName}
      header={header}
      option={CountryOption}
    />
  );
}
