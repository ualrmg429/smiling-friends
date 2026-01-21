import { useQuery } from '@tanstack/react-query';
import { characterService } from '../api/services/characters.service'

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: () => characterService.getAll(),
  });
};

export const useCharacter = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => characterService.getById(id),
    enabled: !!id, 
  });
};

