function SearchBar({
    onChange,
    page,
}: {
    page: number;
    onChange: (key: string, page: number) => void;
}) {
    return (
        <div className="flex justify-center items-center mt-4">
            <input
                type="text"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                onChange={(e) => onChange(e.target.value, page)}
            />
        </div>
    );
}

export default SearchBar;
