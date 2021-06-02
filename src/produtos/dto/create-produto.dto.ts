import { IsNumber } from 'class-validator';

export class CreateProdutoDto {
  nome: string;

  cor: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Informe um número no formato 99999.99' },
  )
  tamanho: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Informe um número no formato 99999.99' },
  )
  valor: number;
}
