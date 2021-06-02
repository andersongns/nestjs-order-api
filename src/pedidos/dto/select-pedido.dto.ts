import { CreateItemPedidoDto } from './create-item-pedido.dto';

export class SelectPedidoDto {
  codigo: string;
  observacao: string;
  data_pedido: Date;
  forma_pagamento: string;
  codigo_cliente: string;
  itemsPedidos: CreateItemPedidoDto[];
}
