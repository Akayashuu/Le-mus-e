import { ArtObject } from '../../types/RicksMuseumApi';
import PaintingCard from './PaintingCard';

function Collection({ ...props }: { itemPerPage: number; data: ArtObject[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {props.data.map((item) => (
                <PaintingCard
                    title={item.title}
                    artist={item.principalOrFirstMaker}
                    image={item.webImage.url}
                />
            ))}
        </div>
    );
}

export default Collection;
