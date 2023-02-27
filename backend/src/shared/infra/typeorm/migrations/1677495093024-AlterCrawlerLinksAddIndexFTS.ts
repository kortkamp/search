import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCrawlerLinksAddIndexFTS1677495093024
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE crawler_links
        ADD COLUMN search_index_col tsvector
               GENERATED ALWAYS AS 
               (setweight(to_tsvector('portuguese', coalesce(title, '')),'A') || 
               setweight(to_tsvector('portuguese', coalesce(description, '')),'B') ||
               setweight(to_tsvector('portuguese', coalesce(h1, '')),'C') ||
               setweight(to_tsvector('portuguese', coalesce(content, '')), 'D')) STORED;

    CREATE INDEX idx_fts_link ON crawler_links
        USING gin(search_index_col);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX idx_fts_link;
      ALTER TABLE crawler_links DROP COLUMN search_index_col;
      `,
    );
  }
}
