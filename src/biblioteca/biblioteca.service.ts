import { Injectable } from '@nestjs/common';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Biblioteca } from './entities/biblioteca.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class BibliotecaService {
  constructor(//Conexión con la base de datos
      @InjectRepository(Biblioteca,'base1')
      private bibliotecaRepository:Repository<Biblioteca>
    ){}
    
  async create(createBibliotecaDto: CreateBibliotecaDto): Promise<Biblioteca> {
    const libro=this.bibliotecaRepository.create(createBibliotecaDto)
    return this.bibliotecaRepository.save(libro);
    
  }

  async findAll():Promise<Biblioteca[]> {
    return this.bibliotecaRepository.find();
  }

  async findOne(id: number):Promise<Biblioteca> {
    return this.bibliotecaRepository.findOne({where:{id}});
  }

  async update(id: number, updateBibliotecaDto: UpdateBibliotecaDto):Promise<string> {
    const libro=await this.findOne(id);
    this.bibliotecaRepository.merge(libro,updateBibliotecaDto);
    this.bibliotecaRepository.save(libro);
    return `El libro con id=#${id} ha sido modificado`;
  }

  async remove(id: number):Promise<string> {
    const libro= await this.findOne(id);
    this.bibliotecaRepository.remove(libro);
    return "Elemento de la base de datos eliminado";
  }
  
  async buscaEditorial(editorial:string):Promise<Biblioteca[]>{
    return this.bibliotecaRepository.find({where:{editorial}})
  }
  async buscaTema(stock:number):Promise<Biblioteca[]>{
    return this.bibliotecaRepository.find({where:{stock:MoreThan(stock)}})
  }
}

