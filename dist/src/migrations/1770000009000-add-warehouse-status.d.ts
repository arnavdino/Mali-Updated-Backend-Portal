import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddWarehouseStatus1770000009000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
