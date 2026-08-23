"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const warehouse_dto_1 = require("./warehouse.dto");
const nestjs_1 = require("@automapper/nestjs");
const warehouse_entity_1 = require("./entities/warehouse.entity");
let WarehouseService = class WarehouseService {
    constructor(warehouseRepository, classMapper) {
        this.warehouseRepository = warehouseRepository;
        this.classMapper = classMapper;
    }
    async create(warehouseDTO) {
        let entity = this.classMapper.map(warehouseDTO, warehouse_dto_1.WarehouseDTO, warehouse_entity_1.Warehouse);
        entity.createdAt = new Date();
        entity = await this.warehouseRepository.save(entity);
    }
    async findOne(id) {
        const warehouse = await this.warehouseRepository.findOne(id, {
            relations: ['location'],
        });
        return this.classMapper.map(warehouse, warehouse_entity_1.Warehouse, warehouse_dto_1.WarehouseDTO);
    }
    async changeStates({ ids, status }) {
        await this.warehouseRepository.query(`update warehouse set status = '${status}' where id in (${ids
            .map((id) => `'${id}'`)
            .join(',')})`);
        return 'ok';
    }
    async update(id, warehouseDTO) {
        let entity = this.classMapper.map(warehouseDTO, warehouse_dto_1.WarehouseDTO, warehouse_entity_1.Warehouse);
        console.log(entity);
        entity.id = +id;
        entity = await this.warehouseRepository.save(entity);
        return 'done';
    }
    async remove(id) {
        const warehouse = await this.warehouseRepository.findOne(id);
        warehouse.deletedAt = new Date();
        warehouse.name = '';
        await this.warehouseRepository.remove(warehouse);
        return 'done';
    }
    async getAll(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        if (filter === null || filter === void 0 ? void 0 : filter.includes('"')) {
            throw new common_1.BadRequestException('invalid filter');
        }
        const [results, count] = await this.warehouseRepository
            .createQueryBuilder('warehouse')
            .skip(meta.rowsPerPage * (meta.page - 1))
            .take(meta.rowsPerPage)
            .select([
            'warehouse.id',
            'warehouse.name',
            'warehouse.phone',
            'warehouse.legalForm',
            'warehouse.capital',
            'warehouse.deletedAt',
        ])
            .where(`warehouse.deletedAt is null ${filter
            ? filter.includes('_@@')
                ? ` and warehouse.status = '${filter.replace('_@@', '')}'`
                : ` and warehouse.name like "%${filter}%"`
            : ''} `)
            .getManyAndCount();
        let warehouses = results.map((p) => this.classMapper.map(p, warehouse_entity_1.Warehouse, warehouse_dto_1.WarehouseDTO));
        return { warehouses, count };
    }
    async search(search) {
        let results = await this.warehouseRepository
            .createQueryBuilder('warehouse')
            .where('warehouse.name like :search', {
            search: `%${search}%`,
        })
            .take(50)
            .orderBy('warehouse.createdAt', 'DESC')
            .select([
            'warehouse.id',
            'warehouse.name',
            'warehouse.phone',
            'warehouse.legalForm',
            'warehouse.capital',
            'warehouse.deletedAt',
        ])
            .getMany();
        return results.map((p) => this.classMapper.map(p, warehouse_entity_1.Warehouse, warehouse_dto_1.WarehouseDTO));
    }
};
WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(warehouse_entity_1.Warehouse)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], WarehouseService);
exports.WarehouseService = WarehouseService;
//# sourceMappingURL=warehouse.service.js.map