import { ArtObject } from '../../types/RijksMuseumApi';
import PaintingCard from './PaintingCard';
const NOT_FOUND =
    'https://ih1.redbubble.net/image.1861329650.2941/flat,750x,075,f-pad,750x1000,f8f8f8.jpg';

function Collection({
    data,
}: {
    start: number;
    end: number;
    data: ArtObject[];
}) {
    const paginatedData = data;
    if (!paginatedData || paginatedData.length === 0) {
        return (
            <div className="flex justify-center items-center h-full bg-black">
                <div className="text-center">
                <p className="text-lg">No items found</p>
                <div className="animate-bounce mt-4 rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }
    const landscapeItems = paginatedData.filter(
        (item) => item.webImage && item.webImage.width > item.webImage.height
    );
    const portraitItems = paginatedData.filter(
        (item) => item.webImage && item.webImage.width <= item.webImage.height
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
                        image={
                            item.webImage && item.webImage.url
                                ? item.webImage.url
                                : NOT_FOUND
                        }
                        data={item}
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
                        image={item.webImage ? item.webImage.url : NOT_FOUND}
                        isLandscape={false}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Collection;
