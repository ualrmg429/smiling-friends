import apiClient from "../axios.config";
import type { Character } from "../../types/character";

export const characterService = {
    getAll: async (): Promise<Character[]> => {
        const { data } = await apiClient.get<Character[]>('/characters');
        return data;
    },
    
}