import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clientesRepository.save(createClienteDto);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find({});
  }

  async findOne(id: string): Promise<Cliente> {
    return this.clientesRepository.findOne(id);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<void> {
    await this.clientesRepository.update({ codigo: id }, updateClienteDto);
  }

  async remove(id: string): Promise<void> {
    await this.clientesRepository.delete(id);
  }
}
