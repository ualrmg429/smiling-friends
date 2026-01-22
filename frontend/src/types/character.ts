export interface Character {
    id: string;
    name: string;
    description: string;
    species: string;
    imageUrl?: string;
    imageFile?: File;
}

export interface CharacterEdit {
    id: string;
    name?: string;
    description?: string;
    species?: string;
    imageFile?: File;
}

export interface CharacterCreate {
    name: string;
    description: string;
    species: string;
    imageFile?: File;
}