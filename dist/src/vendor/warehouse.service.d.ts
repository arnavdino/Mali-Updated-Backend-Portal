import { MetaParam } from 'src/common/file/interfaces';
import { Repository } from 'typeorm';
import { WarehouseDTO } from './warehouse.dto';
import { Mapper } from '@automapper/core';
import { Warehouse } from './entities/warehouse.entity';
export declare class WarehouseService {
    private warehouseRepository;
    private readonly classMapper;
    constructor(warehouseRepository: Repository<Warehouse>, classMapper: Mapper);
    create(warehouseDTO: WarehouseDTO): Promise<void>;
    findOne(id: string): Promise<WarehouseDTO>;
    changeStates({ ids, status }: {
        ids: string[];
        status: string;
    }): Promise<string>;
    update(id: number, warehouseDTO: WarehouseDTO): Promise<string>;
    remove(id: string): Promise<string>;
    getAll(filter: string, meta: MetaParam): Promise<{
        warehouses: WarehouseDTO[];
        count: number;
    }>;
    search(search: string): Promise<WarehouseDTO[]>;
}
