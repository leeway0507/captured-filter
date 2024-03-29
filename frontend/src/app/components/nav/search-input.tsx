import { useRouter } from 'next/navigation'; // Correct import path for useRouter
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function SearchInput() {
  const [inputValue, setInputValue] = useState(''); // Use state to manage the input value
  const router = useRouter();

  const onKeyDownHandler = (event: { key: string; }) => {
    if (event.key === 'Enter' && inputValue) {
      router.push(`/search?q=${inputValue}`);
    }
  };
  const onClickHandler = () => {
    router.push(`/search?q=${inputValue}`);
  };

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update the state on input change
  };

  return (
    <div className="flex flex-grow items-center max-w-[500px] h-[45px]">
      <input
        placeholder="제품명, 제품번호를 검색하세요"
        value={inputValue} // Bind the input value to the state
        onChange={onChangeHandler}
        className="flex-grow placeholder:text-black/90 shadow-none rounded-s-full ps-4 pe-8 placeholder border h-full placeholder:text-sm"
        onKeyDown={onKeyDownHandler}
      />
      <button type="button" className="rounded-e-full bg-gray-100 border h-full py-2 border-s-0 px-3" onClick={onClickHandler} aria-label="Search">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
