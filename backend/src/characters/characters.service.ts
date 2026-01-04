import { Injectable } from '@nestjs/common';
import { CharactersRepository } from './characters.repository';

@Injectable()
export class CharactersService {
    constructor(private characterRepo: CharactersRepository) {}
}
