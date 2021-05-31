import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class cliente1622487481177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cliente',
        columns: [
          {
            name: 'codigo',
            type: 'varchar',
            generationStrategy: 'uuid',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'sexo',
            type: 'char',
            length: '1',
          },
          {
            name: 'email',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cliente');
  }
}
