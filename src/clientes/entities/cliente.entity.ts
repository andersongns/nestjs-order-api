import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @Column()
  nome: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 1, enum: ['M', 'F', 'I'], default: 'I' })
  sexo: string;

  @Column()
  email: string;
}
