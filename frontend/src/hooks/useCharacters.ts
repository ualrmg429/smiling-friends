import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { characterService } from '../api/services/characters.service'

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: () => characterService.getAll(),
  });
};