import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    findAllProducts():string{
        return "Total de productos en el aula 2ASIR"
    }
}
