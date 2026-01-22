import SecondaryButton from "../components/Buttons/SecondaryButton";
import CharactersCardList from "../components/CharactersCardList";
import { useAuth } from "../context/AuthContext";
import { useCharacters } from "../hooks/useCharacters";

export default function CharactersPage() {
    const { data, isLoading, error } = useCharacters(); 
    const { user } = useAuth();
    const isAdmin = (user?.role === "ADMIN");
    if (isLoading) return <div>Wait</div>;
    if (error) return <div>Error loading characters</div>;
    if (!data) return <div>No data available</div>;

    return (
        <main className="p-8 items-center">
            <h1 className="font-heading text-3xl mb-6">Characters</h1>
            { isAdmin ? 
                <SecondaryButton 
                    label="Create new character"
                    additionalClasses="mb-6"
                />
            : null}
            
            <CharactersCardList characters={data} />
        </main>
    );
}