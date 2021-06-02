import { ColumnNumericTransformer } from 'src/helpers/transformers';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @Column()
  codigo_pedido: string;

  @Column()
  codigo_produto: string;

  @Column()
  quantidade: number;

  @Column('decimal', {
    precision: 8,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  valor: number;
}
