import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCrawlerLink1677255388458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'crawler_links',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'url',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'is_crawling',
            type: 'boolean',
            default: false,
          },
          {
            name: 'references_number',
            type: 'integer',
            default: 0,
          },
          {
            name: 'crawled_at',
            type: 'timestamp with time zone',
            isNullable: true,
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
    await queryRunner.dropTable('crawler_link');
  }
}
