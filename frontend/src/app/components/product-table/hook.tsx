'use client';

import { useEffect, useState } from 'react';
import { StoreProps } from '@/app/type';

export type ProductFilterMeta = {
  storeName: StoreProps[]
  brand : string[]
};

export function GetProductFilterMeta():ProductFilterMeta | undefined {
  const [productFilter, setProductFilter] = useState<ProductFilterMeta>();

  useEffect(() => {
    async function f() {
      const r = await fetch('http://localhost:8080/api/product/filter-meta');
      const x = await r.json();
      setProductFilter(x.data);
    }
    f();
  }, []);
  return productFilter;
}
