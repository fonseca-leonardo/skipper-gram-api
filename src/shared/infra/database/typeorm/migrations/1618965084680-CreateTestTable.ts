import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTestTable1618965084680 implements MigrationInterface {
  private userTable: Table;

  constructor() {
    this.userTable = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          isGenerated: true,
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
