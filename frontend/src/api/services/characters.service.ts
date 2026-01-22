import apiClient from "../axios.config";
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
        const { data } = await apiClient.patch<Character>(`/characters/${id}`, fields);
        return data;
    },
}