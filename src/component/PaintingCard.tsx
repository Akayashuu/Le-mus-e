type Painting = {
    title: string;
    artist: string;
    image: string;
    isLandscape: boolean;
};

function PaintingCard({ title, artist, image, isLandscape }: Painting) {
    return (
        <div className="flex">
            <div className="w-full h-auto rounded overflow-hidden shadow-lg bg-white">
            <img
                className={`w-full h-auto object-cover ${isLandscape ? 'max-h-60' : 'max-h-96'}`}
                src={image}
                alt={title}
            />
            <div className="py-2 px-2">
                <div className="font-bold text-xl mb-1 break-words text-black" style={{ fontFamily: 'RijksCyrillicText' }}>
                {title}
                </div>
                <p className="text-gray-700 text-base break-words" style={{ fontFamily: 'RijksCyrillicText' }}>
                {artist}
                </p>
            </div>
            </div>
        </div>
    );
}

export default PaintingCard;
