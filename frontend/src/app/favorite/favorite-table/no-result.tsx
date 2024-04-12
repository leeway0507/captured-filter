'use client ';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NoFavorite() {
  const router = useRouter();
  return (
    <div className="flex-col flex-center grow py-8 gap-4">
      <span className="text-2xl">즐겨찾기 제품이 없습니다.</span>
      <Button type="button" aria-label="goBack" asChild={false} onClick={router.back}>돌아가기</Button>
    </div>
  );
}
