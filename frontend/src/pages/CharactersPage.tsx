import CharactersCardList from "../components/CharactersCardList";
import { mockCharacters } from "../data/mockCharacters";


export default function CharactersPage() {
    return (
        <div className="p-8 items-center">
            <h1 className="font-heading text-3xl mb-6">Characters</h1>
            <CharactersCardList characters={mockCharacters} />
        </div>
    );
}