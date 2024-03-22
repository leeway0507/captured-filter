import { Input } from '../ui/input';

export default function SearchInput({ value, setValue }
:{ value:string, setValue: (s:string)=>void }) {
  return (
    <div className="flex items-center py-4 w-[300px]">
      <Input
        placeholder="제품명, 제품번호를 검색하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="placeholder:text-black border-b border-none shadow-none "
      />
    </div>
  );
}
