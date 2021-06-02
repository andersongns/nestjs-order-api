import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  @Length(11, 11)
  cpf: string;

  @IsEnum(['M', 'F', 'I'], {
    message: 'Sexo precisa ser [M]asculino, [F]eminino ou [I]',
  })
  sexo: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
}
