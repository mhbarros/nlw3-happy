import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602977994473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar(100)'
                },
                {
                    name: 'id_orphanage',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['id_orphanage'],
                    referencedTableName: 'orphanage',
                    referencedColumnNames: ['id'],
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
