import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class produto1622488089512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produto',
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
            name: 'cor',
            type: 'varchar',
          },
          {
            name: 'tamanho',
            type: 'decimal',
            precision: 5,
            scale: 2,
            default: 0,
          },
          {
            name: 'valor',
            type: 'decimal',
            precision: 5,
            scale: 2,
            default: 0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('produto');
  }
}
