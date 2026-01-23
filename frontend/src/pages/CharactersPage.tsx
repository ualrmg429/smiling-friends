import { useState } from "react";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import CharactersCardList from "../components/CharactersCardList";
import { useAuth } from "../context/AuthContext";
import { useCharacters } from "../hooks/useCharacters";
import CreateCharacterForm from "../components/CreateCharacterForm";

export default function CharactersPage() {
    const { data, isLoading, error } = useCharacters(); 
    const { user } = useAuth();
    const isAdmin = (user?.role === "ADMIN");
    console.log('Is Admin:', isAdmin);
    const [isCreating, setIsCreating] = useState(false);

    console.log('isLoading:', isLoading);
    console.log('error:', error);
    console.log('data:', data);

    if (isLoading) return <div>Wait</div>;
    if (error) return <div>Error loading characters: {error.message}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <main className="max-w-6xl mx-auto p-8">
            <h1 className="font-heading text-3xl mb-6">Characters</h1>
          
            { isAdmin && !isCreating && (
                <SecondaryButton 
                    label="Create new character"
                    additionalClasses="mb-6"
                    onClick={() => setIsCreating(true)}
                />
            )}

            
            { isCreating ?
                <CreateCharacterForm 
                onSuccess={() => setIsCreating(false)} 
                onCancel={() => setIsCreating(false)} 
                />
            : <CharactersCardList characters={data} />}     
            
        </main>
    );
}