import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePages1677687626087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pages',
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
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'h1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'varchar',
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
    await queryRunner.query(`
    ALTER TABLE pages
        ADD COLUMN search_index_col tsvector
               GENERATED ALWAYS AS 
               (setweight(to_tsvector('portuguese', coalesce(title, '')),'A') || 
               setweight(to_tsvector('portuguese', coalesce(description, '')),'B') ||
               setweight(to_tsvector('portuguese', coalesce(h1, '')),'C') ||
               setweight(to_tsvector('portuguese', coalesce(content, '')), 'D')) STORED;

    CREATE INDEX idx_fts_content ON pages
        USING gin(search_index_col);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pages');
  }
}
