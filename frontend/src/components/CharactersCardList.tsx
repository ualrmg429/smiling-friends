import CharacterCard from "./CharacterCard";
import type { Character } from "../types/character";

interface Props {
    characters: Character[];
}

export default function CharactersCardList({ characters }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center max-w-5xl mx-auto gap-6 px-4">
            {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    );
}