import { useEffect, useState } from 'react';
import Collection from './component/Collection';
import RicksMuseumApiWrapper from './modules/RijksMuseumApi';
import Paginate from './component/Paginate';
import { ArtObject } from '../types/RijksMuseumApi';
import SearchBar from './component/SearchBar';

function App() {
    const [cache, setCache] = useState<Map<number, ArtObject[]>>(new Map());
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const ItemPerPage = 12;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await loadNextPages(page);
            setLoading(false);
        }
        fetchData();
    }, []);

    const loadNextPages = async (startPage: number) => {
        for (let i = 0; i < 3; i++) {
            const nextPage = startPage + i;
            if (!cache.has(nextPage)) {
                const data = await RicksMuseumApiWrapper.load({
                    page: nextPage,
                    itemPerPage: 12,
                });
                setCache(
                    (prevCache) =>
                        new Map([
                            ...prevCache,
                            [nextPage, data.getArtObjects()],
                        ])
                );
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1
                className="text-4xl font-bold text-center mb-8 text"
                style={{ fontFamily: 'RijksText' }}
            >
                RIJKSMUSEUM Art Collection
            </h1>
            <SearchBar></SearchBar>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {cache.has(page) && (
                        <Collection
                            start={(page - 1) * ItemPerPage + 1}
                            end={page * ItemPerPage}
                            data={cache.get(page) || []}
                        />
                    )}
                    <Paginate
                        currentPage={page}
                        maxPage={Math.ceil(10000 / ItemPerPage)}
                        onPageChange={async (page) => {
                            setPage(page);
                            const nextPage = page + 1;
                            await loadNextPages(nextPage);
                        }}
                    />
                </>
            )}
            <footer className="text-center mt-8">
                <p className="text-gray-600">Powered by Rijksmuseum API</p>
            </footer>
        </div>
    );
}

export default App;
