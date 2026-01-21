import { useState } from 'react';
import type { Character } from '../types/character';

interface Props {
    character: Character;
}

export default function CharacterDetails({ character }: Props) {
    const [imageSrc, setImageSrc] = useState(character.imageUrl || '/default-character.png');
    
    const handleImageError = () => {
        setImageSrc('/default-character.png');
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-slate-900 rounded-lg p-6 w-full shadow-lg border border-slate-800">
                    <img
                        src={imageSrc}
                        alt={character.name}
                        onError={handleImageError}
                        className="w-full h-auto rounded-lg object-contain max-h-96 shadow-md"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="font-heading text-4xl md:text-5xl text-white mb-2">
                        {character.name}
                    </h1>
                    <div className="flex items-center gap-2 text-lg">
                        <span className="text-gray-400">Species:</span>
                        <span className="text-green-400 font-semibold">{character.species}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"></div>

                <div>
                    <h2 className="font-heading text-2xl text-white mb-4">About</h2>
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                        {character.description}
                    </p>
                </div>
            </div>
        </section>
    );
}