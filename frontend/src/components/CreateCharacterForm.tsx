import { useState } from 'react';
import type { CharacterCreate } from '../types/character';
import MainButton from './Buttons/MainButton';
import SecondaryButton from './Buttons/SecondaryButton';
import { IoIosAdd } from "react-icons/io";
import { MdCancel } from 'react-icons/md';
import { useCreateCharacter } from '../hooks/useCharacters';

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateCharacterForm({ onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState<CharacterCreate & { imageFile?: File }>({
    name: '',
    description: '',
    species: '',
    imageFile: undefined,
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createCharacter = useCreateCharacter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, imageFile: file });
    setImageSrc(URL.createObjectURL(file));
  };

  const handleInputChange = (
    field: keyof CharacterCreate,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.species.trim()) {
      setError('Species is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    try {
      await createCharacter.mutateAsync(formData);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to create character');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      species: '',
      imageFile: undefined,
    });
    setImageSrc(null);
    setError(null);
    onCancel?.();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start ">
      {/* Image Preview */}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-slate-900 rounded-lg p-6 w-full shadow-lg border border-slate-800">
          <label className="cursor-pointer mb-4 inline-block">
            <span className="px-4 py-2 bg-slate-800 rounded text-white hover:bg-slate-700 transition">
              {imageSrc ? 'Change image' : 'Upload image'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              className="w-full h-auto rounded-lg object-contain max-h-96 shadow-md"
            />
          ) : (
            <div className="w-full h-96 rounded-lg bg-slate-800 flex items-center justify-center text-gray-500">
              <span>No image selected</span>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="bg-slate-800 text-white text-4xl font-heading rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter character name"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Species *</label>
            <input
              type="text"
              value={formData.species}
              onChange={e => handleInputChange('species', e.target.value)}
              className="bg-slate-800 text-green-400 font-semibold rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter species"
            />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"></div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              className="bg-slate-800 text-gray-300 rounded p-3 w-full min-h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter character description"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm bg-red-900/20 p-3 rounded">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <SecondaryButton
              label="Cancel"
              Icon={MdCancel}
              additionalClasses="min-w-40"
              onClick={handleCancel}
              disabled={createCharacter.isPending}
            />
            <MainButton
              label={createCharacter.isPending ? 'Creating...' : 'Create'}
              Icon={IoIosAdd}
              type="submit"
              additionalClasses="min-w-40"
              disabled={createCharacter.isPending}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
