import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

interface datos {id?:string,size?:string};
type Product={articulo:string,precio:number,descripcion:string};
type id={id:number;}
@Controller('products')
export class ProductsController {
   constructor(private readonly servicioProducts: ProductsService){}
  @Get()
    findProducts():string{
        return this.servicioProducts.findAllProducts();
    }
    @Get('camiseta')
    findDetalle():string{
        return "Total de camisetas!!"; 
    }
    @Get('camiseta/roja')
    findAdios():string{
        return "Total de camisetas rojas!!"; 
    }
    @Get('query')
    busqueda(@Query() consulta:any):string{
      return `Estás consultando por el ${consulta.articulo} con el precio entre ${consulta.precioMin} y ${consulta.precioMax}` ;
    }  
    // @Get(':id')
    // findById(@Param() parametros:any):string{
    //     return `Obteniendo productso del parámetro ${parametros.id}`
    // }

    // @Get('hot')
    // findHot(){
    //     return "Productos calientes!"
    // }
    
    // @Get(':id/:size')
    // findByIDSize(@Param() parametros:datos):string{
    //     return `Obteniendo productos del tipos ${parametros.id} y tamaño ${parametros.size}`
    // }
    @Get(':id?/:size?')
  findWithOptional(@Param() params: datos) {
    const { id,size } = params;
    if (size && id) {
      return `Item ${id} de tamaño ${size}`;
    } else if (id) {
      return `Todos los items de tipo ${id}`;
    } else {
      return 'Todos los items';
    }
}

    // @Post()
    // insertaProducts(@Body('articulo') producto:string,@Body('precio') precio:number ):string{
    //     return `El producto ${producto} de precio ${precio} se ha insertado correctamente`;
    // }
    @Post()
    insertaProducts(@Body() producto:Product){
      if (producto.articulo==='tablet')
        return {
            status:HttpStatus.OK,
            message:`El producto ${producto.articulo} de precio ${producto.precio} se ha insertado correctamente`
        }
      else{
        return {
          status:HttpStatus.NOT_ACCEPTABLE,
          message:`Sólo se pueden introducir artículos de tablets`
      }
      }
    }
    @Patch(':id')
    actualizaProducts(@Param() ruta:any,@Body() actualizar:any):string{
      return `El producto ${actualizar.id} tiene que actualizar el articulo a ${actualizar.articulo} y precio a ${actualizar.precio}`
    }

    @Delete(':id')
    borraProducts(@Param('id',ParseIntPipe) producto:number):string{
        return `El producto ${producto} va a ser borrado`
    }

}
