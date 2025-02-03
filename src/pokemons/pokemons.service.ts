import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';


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

     async findAll():Promise<Pokemon[]> {
        return this.pokemonRepository.find();
      }
    
      async findOne(id: number):Promise<Pokemon> {
        return this.pokemonRepository.findOne({where:{id}});
      }
    
      async update(id: number, updateBibliotecaDto: UpdatePokemonDto):Promise<string> {
        const poke=await this.findOne(id);
        this.pokemonRepository.merge(poke,updateBibliotecaDto);
        this.pokemonRepository.save(poke);
        return `El pokemon con id=#${id} ha sido modificado`;
      }
    
      async remove(id: number):Promise<string> {
        const poke= await this.findOne(id);
        this.pokemonRepository.remove(poke);
        return "Elemento de la base de datos eliminado";
      }
      
      async buscaPoke(nombre:string):Promise<Pokemon[]>{
        return this.pokemonRepository.find({where:{nombre}})
      }
      async buscaTipo(tipo:string):Promise<Pokemon[]>{
        return this.pokemonRepository.find({where:{tipo}})
      }
      async buscaVida(vida:number):Promise<Pokemon[]>{
        return this.pokemonRepository.find({where:{vida:MoreThan(vida)}})
      }
    }