import CharactersCardList from "../components/CharactersCardList";
import { useCharacters } from "../hooks/useCharacters";


export default function CharactersPage() {
    const { data, isLoading, error } = useCharacters(); 
    if (isLoading) return <div>Wait</div>;
    if (error) return <div>Error loading characters</div>;
    if (!data) return <div>No data available</div>;

    return (
        <main className="p-8 items-center">
            <h1 className="font-heading text-3xl mb-6">Characters</h1>
            <CharactersCardList characters={data} />
        </main>
    );
}