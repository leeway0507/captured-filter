import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { ProductTableProps } from '@/app/(table)/product/price-calculator';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Favorite from '../../product/favorite-cell';

export default function LinkSite({ props }: { props: CellContext<ProductTableProps, any> }) {
  const url = props.row.original.productInfo.product_url;
  return (
    <div className="flex-center flex-col gap-2">
      <Link href={url} target="_blank" rel="noreferrer">
        <Button variant="outline" asChild={false} size="sm" className="gap-1">
          이동
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      </Link>
      <Favorite props={props} />
    </div>
  );
}
