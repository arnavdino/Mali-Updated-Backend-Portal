import { MetaParam } from 'src/common/file/interfaces';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { WarehouseManager } from './entities/warehouse.manger.entity';
import { WarehouseManagerDTO } from './warehouse-manger.dto';
export declare class ManagerService {
    private warehouseManagerRepository;
    private readonly classMapper;
    constructor(warehouseManagerRepository: Repository<WarehouseManager>, classMapper: Mapper);
    create(warehouseManagerDTO: WarehouseManagerDTO): Promise<void>;
    findOne(id: string): Promise<WarehouseManagerDTO>;
    changeStates({ ids, status }: {
        ids: string[];
        status: string;
    }): Promise<string>;
    update(id: string, warehouseManagerDTO: WarehouseManagerDTO): Promise<void>;
    remove(id: string): Promise<string>;
    getAll(filter: string, meta: MetaParam): Promise<{
        managers: WarehouseManagerDTO[];
        count: number;
    }>;
}
