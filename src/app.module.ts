import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AlumnoModule } from './alumno/alumno.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}), 
    TypeOrmModule.forRoot({
      name:'base1',
      type:'mysql',
      host:process.env.URL,
      port:3307,
      username:process.env.USUARIO,
      password:process.env.PASSWORD,
      database: process.env.DBNAME1,
      autoLoadEntities:true,//Esta es la mejor opción para que coja sólo las que haya en módulo
      synchronize:true
    }),
    TypeOrmModule.forRoot({
      name:'base2',
      type:'mysql',
      host:process.env.URL,
      port:3307,
      username:process.env.USUARIO,
      password:process.env.PASSWORD,
      database: process.env.DBNAME2,
      autoLoadEntities:true,//Esta es la mejor opción para que coja sólo las que haya en módulo
      synchronize:true
    }),
    TypeOrmModule.forRoot({
      name:'nestapi1',
      type:'mysql',
      host:process.env.URL,
      port:3307,
      username:process.env.USUARIO,
      password:process.env.PASSWORD,
      database: process.env.DBNAME3,
      autoLoadEntities:true,//Esta es la mejor opción para que coja sólo las que haya en módulo
      synchronize:true
    }),
    UsuarioModule,
    AlumnoModule,
    BibliotecaModule,
    PokemonsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
