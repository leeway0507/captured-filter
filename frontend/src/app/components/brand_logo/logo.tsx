import Image from 'next/image';

const divClass = 'relative w-[40px] lg:w-[50px] aspect-square flex-center p-1 ';
const ImageClass = 'object-contain ';

export default function BrandLogoImage({ brandName }: { brandName: string }) {
  const brandNameBar = brandName.replaceAll(' ', '-').toLowerCase();
  return (
    <div className={`${divClass}`}>
      <Image
        src={`/brand/black/${brandNameBar}-logo.png`}
        alt={`${brandNameBar}-logo`}
        sizes="100"
        quality={100}
        className={ImageClass}
        width={100}
        height={100}
      />
    </div>

  );
}
