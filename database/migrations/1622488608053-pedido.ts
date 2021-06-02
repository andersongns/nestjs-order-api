import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class pedido1622488608053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedido',
        columns: [
          {
            name: 'codigo',
            type: 'varchar',
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'data_pedido',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'observacao',
            type: 'varchar',
          },
          {
            name: 'forma_pagamento',
            type: 'enum',
            enum: ['dinheiro', 'cartao', 'cheque'],
          },
          {
            name: 'codigo_cliente',
            type: 'varchar',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_codigo_cliente',
            referencedTableName: 'cliente',
            referencedColumnNames: ['codigo'],
            columnNames: ['codigo_cliente'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pedido');
  }
}
