import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCrawlerLinksAddFields1677460737790
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('crawler_links', [
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'h1',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'h2',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'content',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('crawler_links', [
      'title',
      'description',
      'h1',
      'h2',
      'content',
    ]);
  }
}
