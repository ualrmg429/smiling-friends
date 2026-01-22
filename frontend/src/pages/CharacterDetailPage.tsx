import { Link, useParams } from "react-router";
import CharacterDetails from "../components/CharacterDetails";
import { useCharacter } from "../hooks/useCharacters";
import { useAuth } from "../context/AuthContext";

export default function CharacterDetailPage() {
    
    const { id } = useParams<{ id: string }>();
    const { data: character, isLoading, error } = useCharacter(id!);
    const { user } = useAuth();
    const isAdmin = (user?.role === "ADMIN");

    if (isLoading) return <div className="p-8 text-center">Cargando personaje...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error.message}</div>;
    if (!character) return <div className="p-8 text-center">Personaje no encontrado</div>;
    
    return (
        <main className="w-full min-h-full bg-slate-950">
            <div className="max-w-6xl mx-auto p-8">
                <Link 
                    to="/characters" 
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
                >
                    ← Return to list
                </Link>
                
                <CharacterDetails isAdmin={isAdmin} character={character} />
            </div>
        </main>
    );
};