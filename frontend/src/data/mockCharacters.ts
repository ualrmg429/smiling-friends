// features/characters/data/mockCharacters.ts
import type { Character } from '../types/character';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Pim Pimlin',
    description: 'El optimista profesional. Pim es la definición de “todo va a salir bien”, incluso cuando claramente no va a salir bien.' +
        'Cree de verdad en la misión de hacer sonreír a la gente, aunque eso implique meterse en situaciones absurdas, perturbadoras o ' +
        'directamente traumáticas. Es pequeño, rosa, adorable… y sorprendentemente resistente al horror existencial.',
    species: 'Critter',
    imageUrl: '/images/Pim.webp'
  },
  {
    id: '2',
    name: 'Charlie Dompler',
    description: 'El realista cansado de la vida. Charlie es ese amigo que ya ha aceptado que el mundo es horrible, pero sigue currando' + 
                'porque hay que pagar las facturas. Sarcástico, apático y con cero paciencia para tonterías, actúa como el ancla' +
                'de cordura del grupo… aunque muchas veces su “cordura” sea simplemente resignación. No cree en la felicidad, pero la tolera.',
    species: 'Critter',
    imageUrl: '/images/Charlie.png'
  },
  {
    id: '3',
    name: 'Allan Red',
    description: 'La ansiedad con patas. Alan es metódico, nervioso y profundamente obsesionado con el orden y las normas.' +
                'Trabaja en la oficina intentando mantener todo bajo control, aunque casi nunca lo consigue.' +
                'Las situaciones cotidianas le generan crisis existenciales desproporcionadas, lo que lo convierte en un imán para el caos.',
    species: 'Critter',
    imageUrl: '/images/Allan.webp'
  },
  {
    id: '4',
    name: 'Glep',
    description: 'El ente incomprensible. Glep se comunica únicamente mediante sonidos extraños e indescifrables,' +
                'pero parece entender absolutamente todo lo que ocurre a su alrededor.' +
                'Es impredecible, silencioso y posiblemente el más peligroso del grupo, aunque nadie sabe realmente de qué es capaz.',
    species: 'Critter',
    imageUrl: '/images/Glep.webp'
  },
  {
    id: '5',
    name: 'Mr. Boss',
    description: 'El jefe más inquietante del mundo laboral. Mr. Boss aparenta ser amable y motivador,' +
                'pero su comportamiento errático y sus cambios de humor lo hacen completamente impredecible.' +
                'Puede pasar de un discurso inspirador a una situación perturbadora en cuestión de segundos.',
    species: 'Human',
    imageUrl: '/images/MrBoss.webp'
  }
];