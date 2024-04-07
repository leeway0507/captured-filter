import Image from 'next/image';

const divClass = 'relative w-[45px] aspect-square flex-center p-1';
const ImageClass = 'object-contain ';

export default function BrandLogoImage({ brandName }: { brandName: string }) {
  const brandNameBar = brandName.replaceAll(' ', '-').toLowerCase();
  return (
    <div className={`${divClass}`}>
      <Image
        src={`/brand/black/${brandNameBar}-logo.png`}
        alt={`${brandNameBar}-logo`}
        unoptimized
        sizes="30px"
        className={ImageClass}
        width={100}
        height={100}
      />
    </div>

  );
}
