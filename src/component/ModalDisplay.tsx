import { useEffect, useState } from 'react';
import { ArtObject } from '../../types/RijksMuseumApi';
import { RijksMuseumApiDetails } from '../../types/RijksMuseumApiDetails';

function ModalDisplay({
    data,
    isOpen,
    setOpenModal,
}: {
    data: ArtObject;
    isOpen: boolean;
    setOpenModal: (isOpen: boolean) => void;
}) {
    const [, setDetail] = useState<RijksMuseumApiDetails | null>(null);
    useEffect(() => {
        async function fetchData() {
            const details = await fetch(
                `/.netlify/functions/get-rijks-detail?object-number=${data.objectNumber}`
            ).then((res) => res.json());
            setDetail(details.data);
        }
        fetchData();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpenModal(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false);
        }
    };
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClose}
            style={{ zIndex: 1000 }}
        >
            <div className="bg-transparent rounded-lg shadow-lg p-6 relative max-w-3xl w-full max-h-screen overflow-y-auto">
                <button
                    className="absolute top-2 right-2 text-white hover:text-gray-300"
                    onClick={() => setOpenModal(false)}
                >
                    &times;
                </button>
                <div className="flex flex-col">
                    <img
                        src={data.webImage.url}
                        alt={data.title}
                        className="w-full h-auto max-w-full max-h-[500px] object-contain rounded"
                        onClick={handleClose}
                    />
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-white">
                        {data.title}
                    </h2>
                    <p className="mt-2 text-white">{data.longTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default ModalDisplay;
