import { Injectable } from '@nestjs/common';
import { Image } from 'generated/prisma';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharactersRepository {
    constructor(private prisma: PrismaService) {}

    findById(id : string) {
        return this.prisma.character.findUnique({ where: { id } });
    }

    getAll() {
        return this.prisma.character.findMany();
    }

    create(data: { name : string, description : string, species : string,
        image : Image
    }) {
        return this.prisma.character.create( { data: 
            { 
                name: data.name, 
                description: data.description, 
                species: data.species, 
                image: { connect: { id: data.image.id } } 
            } } );
    }

    update(id : string, name : string, description : string, 
        species : string, image : Image) {
            return this.prisma.character.update({ where: { id }, data: { name, 
                description, species, image: { connect: { id: image.id } }
             } });
    }

    delete(id : string) {
        return this.prisma.character.delete({ where: { id } });
    }


}
