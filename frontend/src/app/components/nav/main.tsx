'use client';

import SearchInput from '@/app/components/nav/search-input';
import { Suspense } from 'react';
import Nav from './nav';
import Logo from './logo';

export default function NavMain() {
  return (
    <div className="mx-auto max-w-[1660px] relative px-4 py-2 flex flex-col md:flex-row w-full bg-white items-center justify-between gap-2">
      <Logo />
      <SearchInput />
      <Suspense>
        <Nav />
      </Suspense>
    </div>
  );
}
