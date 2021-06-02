import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedido } from './entities/itemPedido.entity';
import { ClientesModule } from 'src/clientes/clientes.module';
import { ProdutosModule } from 'src/produtos/produtos.module';

@Module({
  imports: [
    ClientesModule,
    ProdutosModule,
    TypeOrmModule.forFeature([Pedido]),
    TypeOrmModule.forFeature([ItemPedido]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
