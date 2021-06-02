import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}
  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtosRepository.save(createProdutoDto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtosRepository.find({});
  }

  async findOne(id: string): Promise<Produto> {
    return this.produtosRepository.findOne(id);
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto): Promise<void> {
    await this.produtosRepository.update({ codigo: id }, updateProdutoDto);
  }

  async remove(id: string): Promise<void> {
    await this.produtosRepository.delete(id);
  }
}
