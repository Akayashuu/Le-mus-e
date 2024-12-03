import { useEffect, useState } from 'react';
import Collection from './component/Collection';
import RicksMuseumApiWrapper from './modules/RijksMuseumApi';
import Paginate from './component/Paginate';
import { ArtObject } from '../types/RijksMuseumApi';

function App() {
    const [painting, setPainting] = useState<ArtObject[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const ItemPerPage = 12;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await RicksMuseumApiWrapper.load({ itemPerPage: 100 });
            setPainting(data.getArtObjects());
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <Collection
                        start={(page - 1) * ItemPerPage}
                        end={page * ItemPerPage}
                        data={painting}
                    />
                    <Paginate
                        currentPage={page}
                        maxPage={Math.ceil(painting.length / ItemPerPage)}
                        onPageChange={(page) => setPage(page)}
                    />
                </>
            )}
        </div>
    );
}

export default App;
