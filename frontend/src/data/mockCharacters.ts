// features/characters/data/mockCharacters.ts
import type { Character } from '../types/character';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Pim Pimlin',
    description: 'El optimista profesional. Pim es la definición de “todo va a salir bien”, incluso cuando claramente no va a salir bien.' +
        'Cree de verdad en la misión de hacer sonreír a la gente, aunque eso implique meterse en situaciones absurdas, perturbadoras o ' +
        'directamente traumáticas. Es pequeño, rosa, adorable… y sorprendentemente resistente al horror existencial.',
    species: 'Criatura rosa',
    imageUrl: '/images/Pim.webp'
  },
  {
    id: '2',
    name: 'Charlie Dompler',
    description: 'El realista cansado de la vida. Charlie es ese amigo que ya ha aceptado que el mundo es horrible, pero sigue currando' + 
                'porque hay que pagar las facturas. Sarcástico, apático y con cero paciencia para tonterías, actúa como el ancla' +
                'de cordura del grupo… aunque muchas veces su “cordura” sea simplemente resignación. No cree en la felicidad, pero la tolera.',
    species: 'Criatura amarilla',
    imageUrl: '/images/Charlie.png'
  }
];