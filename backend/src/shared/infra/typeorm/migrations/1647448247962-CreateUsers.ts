import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1647448247962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },

          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'role',
            type: 'enum',
            enumName: 'userRoles',
            enum: ['super_admin', 'admin', 'crawler'],
          },
          {
            name: 'email',
            type: 'varchar(100)',
          },
          {
            name: 'password',
            type: 'varchar(255)',
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
