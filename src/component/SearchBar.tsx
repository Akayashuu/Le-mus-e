import { useState } from 'react';

function SearchBar({
    onChange,
    page,
}: {
    page: number;
    onChange: (key: string, page: number) => void;
}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e.target.value, page);
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <input
                type="text"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 ease-in-out focus:shadow-lg"
                placeholder="Search..."
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;
