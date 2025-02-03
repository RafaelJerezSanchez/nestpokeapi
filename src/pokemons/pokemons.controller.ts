import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
    async create(@Body() CreatePokemonDto: CreatePokemonDto):Promise<Pokemon> {
      return this.pokemonsService.create(CreatePokemonDto);
    }
  
    @Get()
    async findAll():Promise<Pokemon[]> {
      return this.pokemonsService.findAll();
    }

  @Get('query1')
  async rutaQuery(@Query('nombre') nombre:string):Promise<Pokemon[]>{
        return this.pokemonsService.buscaPoke(nombre);
  }

  @Get('query2')
  async ruta(@Query('tipo') tipo:string):Promise<Pokemon[]>{
        return this.pokemonsService.buscaTipo(tipo);
  }

  @Get('query3')
  async rutaQ(@Query('vida') vida:number):Promise<Pokemon[]>{
        return this.pokemonsService.buscaVida(vida);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Pokemon> {
    return this.pokemonsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() UpdatePokemonDto: UpdatePokemonDto):Promise<string> {
    return this.pokemonsService.update(+id, UpdatePokemonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<string> {
    return this.pokemonsService.remove(+id);
  }
}
