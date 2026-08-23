import { MigrationInterface, QueryRunner } from "typeorm";
export declare class indexDeletedAt1718631716564 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
