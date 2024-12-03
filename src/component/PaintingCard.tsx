type Painting = {
    title: string;
    artist: string;
    image: string;
    isPaysage: boolean;
};

function PaintingCard({ title, artist, image }: Painting) {
    return (
        <div className="flex">
            <div className="w-96 h-auto rounded overflow-hidden shadow-lg bg-white">
                <img
                    className="w-full h-72 object-cover"
                    src={image}
                    alt={title}
                />
                <div className="py-2 px-2">
                    <div className="font-bold text-xl mb-1 break-words" style={{ fontFamily: 'RijksText' }}>
                        {title}
                    </div>
                    <p className="text-gray-700 text-base break-words" style={{ fontFamily: 'RijksText' }}>
                        {artist}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PaintingCard;
