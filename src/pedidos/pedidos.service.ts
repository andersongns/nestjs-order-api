import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesService } from 'src/clientes/clientes.service';
import { ProdutosService } from 'src/produtos/produtos.service';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { SelectPedidoDto } from './dto/select-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ItemPedido } from './entities/itemPedido.entity';
import { Pedido } from './entities/pedido.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PedidosService {
  private readonly logger = new Logger(PedidosService.name);

  constructor(
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private itemPedidoRepository: Repository<ItemPedido>,
    private clienteServices: ClientesService,
    private produtoServices: ProdutosService,
    private readonly mailerService: MailerService,
  ) {}
  async create(createPedidoDto: CreatePedidoDto): Promise<SelectPedidoDto> {
    const user = await this.clienteServices.findOne(
      createPedidoDto.codigo_cliente,
    );
    if (!user?.codigo) throw new NotFoundException('usuário não encontrado');

    const items = await this.getProductsValid(createPedidoDto);
    const { forma_pagamento, observacao, codigo_cliente } = createPedidoDto;

    const pedido = await this.pedidoRepository.save({
      forma_pagamento,
      observacao,
      codigo_cliente,
      data_pedido: new Date(),
    });

    const itemsPedidos = await this.createOrUpdateItemPedido(
      pedido.codigo,
      items,
    );

    return { ...pedido, itemsPedidos };
  }

  async findAll(): Promise<Pedido[]> {
    this.pedidoRepository.createQueryBuilder('pedido');
    const pedidos = await this.pedidoRepository.find({});

    return Promise.all(
      pedidos.map(async (pedido) => {
        const itemsPedidos = await this.itemPedidoRepository.find({
          codigo_pedido: pedido.codigo,
        });
        return { ...pedido, itemsPedidos };
      }),
    );
  }

  async findOne(id: string): Promise<any> {
    const pedido = await this.pedidoRepository.findOne(id);
    const itemsPedidos = await this.itemPedidoRepository.find({
      codigo_pedido: pedido.codigo,
    });
    return { ...pedido, itemsPedidos };
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto): Promise<void> {
    const { forma_pagamento, observacao, codigo_cliente } = updatePedidoDto;

    await this.pedidoRepository.update(
      { codigo: id },
      { forma_pagamento, observacao, codigo_cliente },
    );
    const items = await this.getProductsValid(updatePedidoDto);

    this.itemPedidoRepository.delete({ codigo_pedido: id });
    await this.createOrUpdateItemPedido(id, items);
  }

  async remove(id: string): Promise<void> {
    await this.itemPedidoRepository.delete({ codigo_pedido: id });
    await this.pedidoRepository.delete(id);
  }

  async getProductsValid(
    pedidoDto: UpdatePedidoDto | CreatePedidoDto,
  ): Promise<any[]> {
    const items = await Promise.all(
      pedidoDto.itemsPedidos.map(async (item) => {
        const found = await this.produtoServices.findOne(item.codigo_produto);
        if (!found) return;
        return { ...found, ...item };
      }),
    );

    if (pedidoDto.itemsPedidos.length !== items.filter(Boolean).length)
      throw new NotFoundException('Produto informado não encontrado');
    return items;
  }

  async createOrUpdateItemPedido(
    codigo_pedido: string,
    items: {
      codigo_produto: string;
      quantidade: number;
      codigo: string;
      nome: string;
      cor: string;
      tamanho: number;
      valor: number;
    }[],
  ) {
    const itemsPedido = await Promise.all(
      items.map(async (item) => {
        const { codigo, quantidade, valor } = item;
        return this.itemPedidoRepository.save({
          codigo_pedido: codigo_pedido,
          codigo_produto: codigo,
          quantidade,
          valor,
        });
      }),
    );

    return itemsPedido;
  }

  async reportById(id: string): Promise<Buffer> {
    const result = await this.getPedidoDetails(id);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      doc.text(result, 100, 50);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  async getPedidoDetails(id: string): Promise<string> {
    const pedido = await this.pedidoRepository.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    const itemsPedidos = await this.itemPedidoRepository.find({
      codigo_pedido: pedido.codigo,
    });

    const produtos = await Promise.all(
      itemsPedidos.map(async (item, index) => {
        const produto = await this.produtoServices.findOne(item.codigo_produto);
        return {
          text: `${index + 1} - ${produto.nome}           Qtd: ${
            item.quantidade
          }           R$: ${item.quantidade * item.valor} <br />`,
          sum: item.quantidade * item.valor,
        };
      }),
    );

    const lista = produtos.reduce(
      (acc, produto) => {
        acc.body += produto.text;
        acc.total += produto.sum;
        return acc;
      },
      { body: '', total: 0 },
    );

    return `
            <h1>--- Informações do pedido ---</h1> <br />
            Código: ${pedido.codigo} <br />
            Data do pedido: ${pedido.data_pedido.toLocaleDateString(
              'pt-BR',
            )} <br />
            Observação: ${pedido.observacao} <br />
            Forma de pagamento: ${pedido.forma_pagamento} <br />
            <br />
            <h2>--- Produtos ---</h2>
            ${lista.body}
            
            -- Total: ${lista.total}
      `;
  }

  async enviarPedidoPorEmail(id: string): Promise<void> {
    const pedido = await this.pedidoRepository.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    const user = await this.clienteServices.findOne(pedido.codigo_cliente);
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'noreply@nestjs.com',
        subject: 'Solicitação de Pedido ✔',
        template: 'pedido',
        text: 'welcome',
        html: await this.getPedidoDetails(id),
      })
      .catch((error) => {
        this.logger.error(error.message);
      });
  }
}
