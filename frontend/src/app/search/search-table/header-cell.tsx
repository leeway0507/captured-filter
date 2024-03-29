import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CellContext } from '@tanstack/react-table';
import { ProductTableProps } from '@/app/components/product-table/price-calculator';

export default function LinkSite({ props }: { props: CellContext<ProductTableProps, any> }) {
  const url = props.row.original.productInfo.product_url;
  return (
    <Button variant="secondary" className="font-medium" asChild>
      <Link href={url} target="_blank" rel="noreferrer">사이트 이동</Link>
    </Button>
  );
}
