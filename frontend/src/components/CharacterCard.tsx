import type { Character } from '../types/character';

interface Props {
    character: Character;
}


export default function CharacterCard({ character }: Props) {
  return (
    <div 
      className="border-1 border-slate-800 rounded-lg shadow-md p-4 w-64 
        cursor-pointer hover:bg-slate-900">
      <img 
        src={character.imageUrl || '/default-character.png'} 
        alt={character.name}
        className="w-full h-48 object-contain object-top rounded"
      />
      <h3 className="font-heading text-xl mt-2 truncate">{character.name}</h3>
      <p className="text-gray-500 truncate">{character.species}</p>
    </div>
  );
}