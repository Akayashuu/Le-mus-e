type Painting = {
    title: string;
    artist: string;
    image: string;
};

function PaintingCard({ title, artist, image }: Painting) {
    return (
        <div className="flex">
            <div className="w-80 h-96 rounded overflow-hidden shadow-lg">
                <img
                    className="w-full h-3/4 object-cover"
                    src={image}
                    alt={title}
                />
                <div className="px-6 py-4 h-1/4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{artist}</p>
                </div>
            </div>
        </div>
    );
}

export default PaintingCard;
