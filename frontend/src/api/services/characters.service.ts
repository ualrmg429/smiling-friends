import apiClient from "../interceptors";
import type { Character, CharacterEdit } from "../../types/character";

export const characterService = {
    getAll: async (): Promise<Character[]> => {
        const { data } = await apiClient.get<Character[]>('/characters');
        return data;
    },

    getById: async (id: string): Promise<Character> => {
        const { data } = await apiClient.get<Character>(`/characters/${id}`);
        return data;
    },

    edit: async (id: string, fields: CharacterEdit): Promise<Character> => {
        const formData = new FormData();

        if (fields.name) formData.append('name', fields.name);
        if (fields.description) formData.append('description', fields.description);
        if (fields.species) formData.append('species', fields.species);
        if (fields.imageFile) formData.append('image', fields.imageFile);

        console.log('FormData creado:', formData instanceof FormData); // ← Añade esto
        console.log('Contenido:', [...formData.entries()]); // ← Y esto para ver qué tiene

        const { data } = await apiClient.patch<Character>(
            `/characters/${id}`,
            formData  // ← Asegúrate de que NO tenga headers aquí
        );
        
        return data;
    }
}