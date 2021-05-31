import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class itemPedido1622492996466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item_pedido',
        columns: [
          {
            name: 'codigo',
            type: 'varchar',
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'codigo_pedido',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'codigo_produto',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quantidade',
            type: 'int',
          },
          {
            name: 'valor',
            type: 'decimal',
            precision: 5,
            scale: 2,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_codigo_pedido',
            referencedTableName: 'pedido',
            referencedColumnNames: ['codigo'],
            columnNames: ['codigo_pedido'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'fk_codigo_produto',
            referencedTableName: 'produto',
            referencedColumnNames: ['codigo'],
            columnNames: ['codigo_produto'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_pedido');
  }
}
