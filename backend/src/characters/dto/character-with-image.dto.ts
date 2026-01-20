export interface CharacterWithImage {
    id: string;
    name: string;
    description: string;
    species: string;
    image?: {
        url: string;
    } | null;
    imageUrl?: string;
}