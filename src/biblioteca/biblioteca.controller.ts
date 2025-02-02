import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { Biblioteca } from './entities/biblioteca.entity';

@Controller('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Post()
  async create(@Body() createBibliotecaDto: CreateBibliotecaDto):Promise<Biblioteca> {
    return this.bibliotecaService.create(createBibliotecaDto);
  }

  @Get()
  async findAll():Promise<Biblioteca[]> {
    return this.bibliotecaService.findAll();
  }

  @Get('query1')
  async rutaQuery(@Query('editorial') editorial:string):Promise<Biblioteca[]>{
        return this.bibliotecaService.buscaEditorial(editorial);
  }
  @Get('query2')
  async ruta(@Query('stock') stock:number):Promise<Biblioteca[]>{
        return this.bibliotecaService.buscaTema(stock);
  }
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Biblioteca> {
    return this.bibliotecaService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBibliotecaDto: UpdateBibliotecaDto):Promise<string> {
    return this.bibliotecaService.update(+id, updateBibliotecaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string):Promise<string> {
    return this.bibliotecaService.remove(+id);
  }
}
