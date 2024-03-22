'use client';

import { useEffect, useCallback, useState } from 'react';
import { CurrencyProps } from '@/app/type';
import getData from '../../app/components/fetch/fetch';

export default function useCurrency():CurrencyProps | undefined {
  const [currency, setCurrency] = useState<CurrencyProps>();
  const fetchCurrency = useCallback(async () => {
    const curr = await getData<CurrencyProps>('currency');
    setCurrency(curr);
  }, []);

  useEffect(() => {
    fetchCurrency();
  }, [fetchCurrency]);

  return currency;
}
