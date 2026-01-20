import type { Character } from '../types/character';
import { Link } from 'react-router';
import { useState } from 'react';

interface Props {
    character: Character;
}


export default function CharacterCard({ character }: Props) {
  const [imageSrc, setImageSrc] = useState(character.imageUrl || '/default-character.png');
  
  const handleImageError = () => {
    setImageSrc('/default-character.png');
  };

  return (
    <Link to={`/${character.name}`}>
      <div 
        className="border-1 border-slate-800 rounded-lg shadow-md p-4 w-64 
          cursor-pointer hover:bg-slate-900">
        <img 
          src={imageSrc}
          alt={character.name}
          onError={handleImageError}
          className="w-full h-48 object-contain object-top rounded"
        />
        <h3 className="font-heading text-xl mt-2 truncate">{character.name}</h3>
        <p className="text-gray-500 truncate">{character.species}</p>
      </div>
    </Link>

  );
}