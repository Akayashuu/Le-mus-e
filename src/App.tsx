import { useEffect, useState } from 'react';
import Collection from './component/Collection';
import Paginate from './component/Paginate';
import { ArtObject } from '../types/RijksMuseumApi';
import SearchBar from './component/SearchBar';

function App() {
    const [pageCache, setPageCache] = useState<Map<number, ArtObject[]>>(
        new Map()
    );
    const [searchCache, setSearchCache] = useState<Map<string, ArtObject[]>>(
        new Map()
    );
    const [currentSearch, setCurrentSearch] = useState('');
    const [currentData, setCurrentData] = useState<ArtObject[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const ItemPerPage = 12;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await loadNextPages(page);
            setLoading(false);
            setCurrentData(pageCache.get(1) || []);
        }
        fetchData();
    }, []);

    const loadNextPages = async (startPage: number) => {
        for (let i = 0; i < 3; i++) {
            const nextPage = startPage + i;
            if (!pageCache.has(nextPage)) {
                const ApiUrl = `/.netlify/functions/get-rijks?page=${nextPage}&itemPerPage=${ItemPerPage}`;
                const data = await fetch(ApiUrl).then((res) => res.json());
                setPageCache((map) => map.set(nextPage, data.data));
            }
        }
    };

    const onSearch = async (key: string, page:number) => {
        if (key === '') {
            setPage(1);
            setCurrentData(pageCache.get(page) || []);
            setCurrentSearch('');
            return;
        }
        if (searchCache.has(`${key}-${page}`)) {
            setCurrentData(searchCache.get(`${key}-${page}`) || []);
            return;
        }
        const ApiUrl = `/.netlify/functions/get-rijks?search=${key}&page=${page}`;
        const data = await fetch(ApiUrl).then((res) => res.json());
        setSearchCache((map) => map.set(`${key}-${page}`, data.data));
        setCurrentData(data.data);
        setCurrentSearch(key);
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
            <header className="space-y-4">
                <h1
                    className="text-5xl font-bold text-center mb-4"
                    style={{ fontFamily: 'RijksText' }}
                >
                    RIJKSMUSEUM Art Collection
                </h1>
                <p className="text-center text-lg text-gray-700">
                    Discover a curated selection of art from the Rijksmuseum
                </p>
            </header>
            <main className="space-y-12">
                <SearchBar onChange={onSearch}  page={page}/>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {currentData.length > 0 ? (
                            <Collection
                                start={(page - 1) * ItemPerPage + 1}
                                end={page * ItemPerPage}
                                data={currentData}
                            />
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                        <Paginate
                            currentPage={page}
                            maxPage={Math.ceil(10000 / ItemPerPage)}
                            onPageChange={async (page) => {
                                setPage(page);
                                if (currentSearch === '') {
                                    if (!pageCache.has(page)) {
                                        await loadNextPages(page);
                                    }
                                    setCurrentData(pageCache.get(page) || []);
                                } else {
                                    if (!searchCache.has(`${currentSearch}-${page}`)) {
                                        await onSearch(currentSearch, page);
                                    } else {
                                        setCurrentData(searchCache.get(`${currentSearch}-${page}`) || []);
                                    }
                                }
                            }}
                        />
                    </div>
                )}
            </main>
            <footer className="text-center mt-16 text-gray-600">
                <p>Powered by Rijksmuseum API</p>
            </footer>
        </div>
    );
    
}

export default App;
