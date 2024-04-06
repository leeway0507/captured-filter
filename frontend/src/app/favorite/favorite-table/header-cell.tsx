import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { ProductTableProps } from '@/app/components/product-table/price-calculator';
import { Favorite } from '@/app/components/product-table/header-cell';

export default function LinkSite({ props }: { props: CellContext<ProductTableProps, any> }) {
  const url = props.row.original.productInfo.product_url;
  return (
    <div className="flex flex-col gap-2">
      <Button variant="secondary" className="font-medium" asChild>
        <Link href={url} target="_blank" rel="noreferrer">사이트 이동</Link>
      </Button>
      <Favorite props={props} />
    </div>
  );
}
