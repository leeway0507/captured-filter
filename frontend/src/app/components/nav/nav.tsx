'use client';

import Link from 'next/link';
import Separator from '@/components/ui/separator';
import { usePathname, useSearchParams } from 'next/navigation';

function Nav() {
  // const headersList = headers();
  const pathName = usePathname();
  const param = useSearchParams();
  let product = '';
  let store = '';
  let sale = '';
  let favorite = '';
  switch (pathName) {
    case '/store':
      store = 'font-bold underline';
      break;
    case '/favorite':
      favorite = 'font-bold underline';
      break;
    case '/':
      if (param.has('sale')) {
        sale = 'font-bold underline';
      } else {
        product = 'font-bold underline';
      }
      break;
    case '/sale':

      break;
    default:
  }

  return (
    <nav className="flex gap-2 px-2">
      <Separator orientation="vertical" />
      <Link href="/favorite" className="flex items-baseline justify-between gap-1">
        <div className="font-semibold text-xs text-rose-600">New</div>
        <div className={`${favorite} hover:underline `}>
          즐겨찾기
        </div>
      </Link>
      <Separator orientation="vertical" />
      <Link href="/" className={`${product} hover:underline`}>제품</Link>
      <Separator orientation="vertical" />
      <Link href="/?sale=true" className={`${sale} hover:underline`}>세일</Link>
      <Separator orientation="vertical" />
      <Link href="/store" className={`${store} hover:underline`}>편집샵</Link>
    </nav>
  );
}

export default Nav;
