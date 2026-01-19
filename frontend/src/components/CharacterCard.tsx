import type { Character } from '../types/character';

interface Props {
    character: Character;
}


export default function CharacterCard({ character }: Props) {
  return (
    <div className=" rounded-lg shadow-md p-4 w-72">
      <img 
        src={character.imageUrl || '/default-character.png'} 
        alt={character.name}
        className="w-full h-48 object-contain object-top rounded"
      />
      <h3 className="font-heading text-xl mt-2 truncate">{character.name}</h3>
      <p className="text-gray-500 truncate">{character.species}</p>
      <p className="font-body mt-2 line-clamp-2">{character.description}</p>
    </div>
  );
}