import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
    nombre: string;
    imagen: string;
    tipo: string;
    vida: number;
    ataque: number;
    defensa: number;
    velocidad: number;
}
