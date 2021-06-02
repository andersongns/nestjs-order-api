import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../../helpers/transformers';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @Column()
  nome: string;

  @Column()
  cor: string;

  @Column('decimal', {
    precision: 5,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  tamanho: number;

  @Column('decimal', {
    precision: 8,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  valor: number;
}
