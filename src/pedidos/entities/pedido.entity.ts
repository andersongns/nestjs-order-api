import { Cliente } from 'src/clientes/entities/cliente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  codigo: string;

  @CreateDateColumn()
  data_pedido: Date;

  @Column()
  observacao: string;

  @Column({ enum: ['dinheiro', 'cartao', 'cheque'] })
  forma_pagamento: string;

  @Column()
  codigo_cliente: string;

  @JoinColumn({ name: 'codigo_cliente' })
  @ManyToOne(() => Cliente)
  cliente: Cliente;
}
