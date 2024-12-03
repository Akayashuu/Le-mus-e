import { useEffect, useState } from 'react';
import Collection from './component/Collection';
import RicksMuseumApiWrapper from './modules/RijksMuseumApi';
import Paginate from './component/Paginate';
import { ArtObject } from '../types/RijksMuseumApi';

function App() {
    const [painting, setPainting] = useState<ArtObject[]>([]);
    const [page, setPage] = useState(1);
    const ItemPerPage = 10;

    useEffect(() => {
        async function fetchData() {
            const data = await RicksMuseumApiWrapper.load(
                {  itemPerPage: 100 }
            );
            setPainting(data.getArtObjects());
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <Collection
                start={(page - 1) * ItemPerPage}
                end={page * ItemPerPage}
                data={painting}
            />
            <Paginate
                currentPage={page}
                maxPage={Math.ceil(painting.length / ItemPerPage)}
                onPageChange={(page) => setPage(page)}
            ></Paginate>
        </div>
    );
}

export default App;