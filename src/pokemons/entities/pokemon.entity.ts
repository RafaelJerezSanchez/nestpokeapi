import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn() // Genera un id autoincremental, si sólo fuera clave sería @PrimaryColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
    nombre: string;
  @Column()
    imagen: string;
  @Column()
    tipo: string;
  @Column()
    vida: number;
  @Column()
    ataque: number;
  @Column()
    defensa: number;
  @Column()
    velocidad: number;
}