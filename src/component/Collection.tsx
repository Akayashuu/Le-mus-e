import { ArtObject } from '../../types/RijksMuseumApi';
import PaintingCard from './PaintingCard';

function Collection({
    ...props
}: {
    start: number;
    end: number;
    data: ArtObject[];
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {(() => {
                const items = [];
                for (let i = props.start; i < props.end; i++) {
                    const item = props.data[i];
                    if (item) {
                        items.push(
                            <PaintingCard
                                key={item.id}
                                title={item.title}
                                artist={item.principalOrFirstMaker}
                                image={item.webImage.url}
                            />
                        );
                    }
                }
                return items;
            })()}
        </div>
    );
}

export default Collection;
