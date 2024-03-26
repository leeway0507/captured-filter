'use client';

import SearchInput from '@/app/components/nav/search-input';
import { Suspense } from 'react';
import Nav from './nav';
import Logo from './logo';

export default function NavMain() {
  return (
    <div className="relative px-4 flex h-[70px] w-full bg-white items-center border-b gap-2">
      <Logo />
      <Suspense>
        <Nav />
      </Suspense>
      <SearchInput />
    </div>
  );
}
