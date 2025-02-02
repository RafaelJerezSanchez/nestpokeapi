import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class PokemonsService {
  constructor(//Conexión con la base de datos
      @InjectRepository(Pokemon,'nestapi1')
      private pokemonRepository:Repository<Pokemon>,
    ){}
    
    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
      const poke = this.pokemonRepository.create(createPokemonDto);
      return this.pokemonRepository.save(poke);
    }

    async findAll(name?: string, type?: string, orderByvida: boolean = true): Promise<Pokemon[]> {
      const query = this.pokemonRepository.createQueryBuilder('pokemon');
  
      // Filtrado por nombre
      if (name) {
        query.andWhere('pokemon.nombre LIKE :name', { name: `%${name}%` });
      }
  
      // Filtrado por tipo
      if (type) {
        query.andWhere('pokemon.tipo LIKE :type', { type: `%${type}%` });
      }
  
      // Ordenar por vida (de mayor a menor)
      if (orderByvida) {
        query.orderBy('pokemon.vida', 'DESC');
      }
  
      return query.getMany();
    }
  
    findOne(id: number) {
      return `This action returns a #${id} pokemon`;
    }
  
    update(id: number, updatePokemonDto: UpdatePokemonDto) {
      return `This action updates a #${id} pokemon`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} pokemon`;
    }
  }