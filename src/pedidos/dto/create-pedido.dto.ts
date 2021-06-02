import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { CreateItemPedidoDto } from './create-item-pedido.dto';

export class CreatePedidoDto {
  observacao: string;

  @IsEnum(['dinheiro', 'cartao', 'cheque'], {
    message: 'Tipo de pagamendo inválido',
  })
  forma_pagamento: string;

  @IsNotEmpty()
  codigo_cliente: string;

  @IsArray()
  @ArrayMinSize(1)
  itemsPedidos: CreateItemPedidoDto[];
}
