function Paginate({
    onPageChange,
    maxPage,
    currentPage,
}: {
    onPageChange: (page: number) => void;
    maxPage: number;
    currentPage: number;
}) {
    return (
        <div className="pagination flex justify-center items-center space-x-2">
            <button
                className="first bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => onPageChange(1)}
                disabled={currentPage <= 1}
            >
                First
            </button>
            <button
                className="previous bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                Previous
            </button>
            <span className="page-info text-gray-700 px-4 py-2">
                {currentPage} / {maxPage}
            </span>
            <button
                className="next bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= maxPage}
            >
                Next
            </button>
            <button
                className="last bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => onPageChange(maxPage)}
                disabled={currentPage >= maxPage}
            >
                Last
            </button>
        </div>
    );
}

export default Paginate;