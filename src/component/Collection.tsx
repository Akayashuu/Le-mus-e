import { ArtObject } from '../../types/RijksMuseumApi';
import PaintingCard from './PaintingCard';

function Collection({
    data,
}: {
    start: number;
    end: number;
    data: ArtObject[];
}) {
    // Extract the paginated range
    const paginatedData = data

    // Separate paintings into landscape and portrait
    const landscapeItems = paginatedData.filter(
        (item) => item.webImage.width > item.webImage.height
    );
    const portraitItems = paginatedData.filter(
        (item) => item.webImage.width <= item.webImage.height
    );

    return (
        <div className="flex flex-col gap-6 p-3">
            {/* Landscape section */}
            <div className="grid gap-4 sm:grid-cols-2">
                {landscapeItems.map((item) => (
                    <PaintingCard
                        key={item.id}
                        title={item.title}
                        artist={item.principalOrFirstMaker}
                        image={item.webImage.url}
                        isLandscape
                    />
                ))}
            </div>

            {/* Portrait section */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                {portraitItems.map((item) => (
                    <PaintingCard
                        key={item.id}
                        title={item.title}
                        artist={item.principalOrFirstMaker}
                        image={item.webImage.url}
                        isLandscape={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Collection;
