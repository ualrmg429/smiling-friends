import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { characterService } from '../api/services/characters.service'
import type { CharacterCreate, CharacterEdit } from '../types/character';

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

export const useEditCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, fields }: { id: string; fields: CharacterEdit }) =>
      characterService.edit(id, fields),

    onSuccess: (updatedCharacter) => {
      queryClient.setQueryData(
        ['character', updatedCharacter.id],
        updatedCharacter
      );

      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
};

export const useCreateCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fields: CharacterCreate) =>
      characterService.create(fields),

    onSuccess: (newCharacter) => {
      queryClient.setQueryData(
        ['character', newCharacter.id],
        newCharacter
      );

      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
};

export const useDeleteCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      characterService.delete(id),

    onSuccess: (_data, { id }) => {
      // Remove the specific character from cache
      queryClient.removeQueries({ queryKey: ['character', id] });

      // Invalidate the characters list
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
};
