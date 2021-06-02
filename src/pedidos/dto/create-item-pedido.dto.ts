import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemPedidoDto {
  @IsNotEmpty()
  codigo_produto: string;

  @IsNumber({})
  quantidade: number;
}
