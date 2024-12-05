import { useState } from 'react';
import ModalDisplay from './ModalDisplay';
import { ArtObject } from '../../types/RijksMuseumApi';

type Painting = {
    title: string;
    artist: string;
    image: string;
    data: ArtObject;
    isLandscape: boolean;
};

function PaintingCard({ title, artist, image, isLandscape, data }: Painting) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        if (isModalOpen) setIsModalOpen(false);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="relative flex" onClick={handleCardClick}>
                <div className="w-full h-auto rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105">
                    <img
                        className={`w-full h-auto object-cover ${
                            isLandscape
                                ? 'max-h-60 min-h-60'
                                : 'max-h-96 min-h-96'
                        }`}
                        src={image}
                        alt={title}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
                        <div
                            className="font-bold text-xl mb-1 break-words"
                            style={{ fontFamily: 'RijksCyrillicText' }}
                        >
                            {title}
                        </div>
                        <p
                            className="text-base break-words"
                            style={{ fontFamily: 'RijksCyrillicText' }}
                        >
                            {artist}
                        </p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ModalDisplay
                    data={data}
                    isOpen={isModalOpen}
                    setOpenModal={setIsModalOpen}
                ></ModalDisplay>
            )}
        </>
    );
}

export default PaintingCard;
