import { useEffect, useState } from 'react';
import Collection from './component/Collection';
import RicksMuseumApiWrapper from './modules/RijksMuseumApi';
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
                const data = await RicksMuseumApiWrapper.load({
                    page: nextPage,
                    itemPerPage: ItemPerPage,
                });
                setPageCache((map) => map.set(nextPage, data.getArtObjects()));
            }
        }
    };

    const onSearch = async (key: string) => {
        if (key === '') {
            setCurrentData(pageCache.get(page) || []);
            return;
        }
        if (searchCache.has(key)) {
            setCurrentData(searchCache.get(key) || []);
            return;
        }
        const data = await RicksMuseumApiWrapper.load({
            search: key,
        });
        setSearchCache((map) => map.set(key, data.getArtObjects()));
        setCurrentData(data.getArtObjects());
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
                <SearchBar onChange={onSearch} />
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {pageCache.has(page) ? (
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
                                if (!pageCache.has(page)) {
                                    await loadNextPages(page + 1);
                                }
                                setCurrentData(pageCache.get(page) || []);
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
