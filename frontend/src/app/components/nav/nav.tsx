'use client';

import Link from 'next/link';
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
    default:
  }

  return (
    <nav className="flex-center gap-4 px-4 whitespace-nowrap">
      <Link href="/" className={`${product} hover:underline`} scroll={false}>제품</Link>
      <Link href="/?sale=true" className={`${sale} hover:underline`} scroll={false}>세일</Link>
      <Link href="/store" className={`${store} hover:underline`} scroll={false}>편집샵</Link>
      <Link href="/favorite" className="flex items-baseline justify-between gap-1 " scroll={false}>
        <div className={`${favorite} hover:underline `}>
          보관함
        </div>
        <div className="font-semibold text-xs text-rose-600">New</div>
      </Link>
    </nav>
  );
}

export default Nav;
