export type SearchParamsProps = {
  page:string,
  filter: string,
};

export function buildUrl(baseParam:string, searchParams:SearchParamsProps) {
  const queryParam = new URLSearchParams();
  Object.entries(searchParams).map((k) => (queryParam.set(k[0], k[1])));

  return `${baseParam}?${queryParam.toString()}`;
}
