import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  // @IsString()
  // @IsNotEmpty()
  nome?: string;
  // @Length(11,11)
  cpf?: string;

  // @IsEnum(['M','F','I'], { message: 'Sexo precisa ser [M]asculino, [F]eminino ou [I]'})
  sexo?: string;

  // @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;
}
