'use client';

import SearchInput from '@/components/table-template/search-input';
import { useState } from 'react';
import Nav from './nav';
import Logo from './logo';

export default function NavMain() {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <div className="relative px-4 flex h-[70px] w-full bg-white items-center border-b gap-2">
      <Logo />
      <Nav />
      <SearchInput value={searchValue} setValue={setSearchValue} />
    </div>
  );
}
