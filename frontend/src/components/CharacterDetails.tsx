import { useState } from 'react';
import type { Character } from '../types/character';
import SecondaryButton from './Buttons/SecondaryButton';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import DeleteButton from './Buttons/DeleteButton';
import { FaSave } from "react-icons/fa";
import { useEditCharacter } from '../hooks/useCharacters';

interface Props {
    isAdmin?: boolean;
    character: Character;
}

export default function CharacterDetails({ isAdmin = false, character }: Props) {
    const [isEditing, setIsEditing ] = useState(false); // Enable to edit character
    const [formData, setFormData] = useState<Character>(character);
    const [imageSrc, setImageSrc] = useState(character.imageUrl || '/default-character.png');
    const editCharacter = useEditCharacter();
    
    const handleImageError = () => {
        setImageSrc('/default-character.png');
    };

    const handleSave = () => {
        editCharacter.mutate({
            id: character.id,
            fields: formData,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);

        setFormData({
            ...formData,
            imageFile: file 
        });
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-slate-900 rounded-lg p-6 w-full shadow-lg border border-slate-800">
                    {isEditing && (
                        <label className="cursor-pointer mb-4 inline-block">
                            <span className="px-4 py-2 bg-slate-800 rounded text-white hover:bg-slate-700">
                            Upload image
                            </span>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            />
                        </label>
                    )}
                    <img
                        src={imageSrc}
                        alt={character.name}
                        onError={handleImageError}
                        className="w-full h-auto rounded-lg object-contain max-h-96 shadow-md"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    {isEditing ? (
                        <input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="bg-slate-800 text-white text-4xl font-heading rounded px-3 py-1 mb-2"
                        />
                        ) : (
                        <h1 className="font-heading text-4xl md:text-5xl text-white mb-2">
                            {character.name}
                        </h1>
                    )}
                    <div className="flex items-center gap-2 text-lg">
                        <span className="text-gray-400">Species:</span>
                        {isEditing ? (
                            <input
                                value={formData.species}
                                onChange={e => setFormData({ ...formData, species: e.target.value })}
                                className="bg-slate-800 text-green-400 font-semibold rounded px-2 "
                            />
                            ) : (
                            <span className="text-green-400 font-semibold">{character.species}</span>
                        )}
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"></div>

                <div>
                    <h2 className="font-heading text-2xl text-white mb-4">About</h2>
                    {isEditing ? (
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="bg-slate-800 text-gray-300 rounded p-3 w-full min-h-40"
                        />
                        ) : (
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {character.description}
                        </p>
                    )}
                </div>

                {isAdmin && (
                    <div className="flex justify-center gap-4">
                        {isEditing ? (
                            <>
                                <SecondaryButton 
                                    label="Cancel"
                                    Icon={MdCancel}
                                    additionalClasses="min-w-40"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData(character);
                                    }}
                                />
                                <DeleteButton
                                    label="Save"
                                    Icon={FaSave}
                                    additionalClasses="min-w-40 bg-orange-400! hover:bg-orange-500!"
                                    onClick={() => {
                                        setIsEditing(false);
                                        handleSave();
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <SecondaryButton 
                                    label="Edit"
                                    Icon={FaEdit}
                                    additionalClasses="min-w-40"
                                    onClick={() => setIsEditing(true)}
                                />
                                <DeleteButton
                                    label="Delete"
                                    Icon={MdDeleteForever}
                                    additionalClasses="min-w-40"
                                    onClick={() => {
                                        // TODO: Call API
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}
                
                
            </div>
        </section>
    );
}