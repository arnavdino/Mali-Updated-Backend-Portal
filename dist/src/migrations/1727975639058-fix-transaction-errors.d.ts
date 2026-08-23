import { MigrationInterface, QueryRunner } from "typeorm";
export declare class fixTransactionErrors1727975639058 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
