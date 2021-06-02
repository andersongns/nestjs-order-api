import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { SelectPedidoDto } from './dto/select-pedido.dto';
import { Response } from 'express';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createPedidoDto: CreatePedidoDto,
  ): Promise<SelectPedidoDto> {
    return this.pedidosService.create(createPedidoDto);
  }

  @Post(':id/sendmail')
  async enviarPedidoPorEmail(@Param('id') id: string): Promise<void> {
    return this.pedidosService.enviarPedidoPorEmail(id);
  }

  @Post(':id/report')
  async reportById(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.pedidosService.reportById(id);

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=${id}.pdf`);
    res.set('Content-Length', `${buffer.length}`);

    res.end(buffer);
  }

  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pedido> {
    return this.pedidosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePedidoDto: UpdatePedidoDto,
  ): Promise<void> {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pedidosService.remove(id);
  }
}
