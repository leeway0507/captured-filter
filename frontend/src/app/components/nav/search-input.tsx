import { useRouter } from 'next/navigation'; // Correct import path for useRouter
import { useState } from 'react';
import { Input } from '../../../components/ui/input';

export default function SearchInput() {
  const [inputValue, setInputValue] = useState(''); // Use state to manage the input value
  const router = useRouter();

  const onKeyDownHandler = (event: { key: string; }) => {
    if (event.key === 'Enter' && inputValue) {
      router.push(`/search?q=${inputValue}`);
    }
  };

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update the state on input change
  };

  return (
    <div className="flex items-center py-4 w-[300px]">
      <Input
        placeholder="제품명, 제품번호를 검색하세요"
        value={inputValue} // Bind the input value to the state
        onChange={onChangeHandler}
        className="placeholder:text-black border-b border-none shadow-none"
        onKeyDown={onKeyDownHandler}
      />
    </div>
  );
}
