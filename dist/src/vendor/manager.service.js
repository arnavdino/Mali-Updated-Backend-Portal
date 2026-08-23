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
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_1 = require("@automapper/nestjs");
const uuid_1 = require("uuid");
const warehouse_manger_entity_1 = require("./entities/warehouse.manger.entity");
const warehouse_manger_dto_1 = require("./warehouse-manger.dto");
const moment = require("moment-timezone");
let ManagerService = class ManagerService {
    constructor(warehouseManagerRepository, classMapper) {
        this.warehouseManagerRepository = warehouseManagerRepository;
        this.classMapper = classMapper;
    }
    async create(warehouseManagerDTO) {
        let entity = this.classMapper.map(warehouseManagerDTO, warehouse_manger_dto_1.WarehouseManagerDTO, warehouse_manger_entity_1.WarehouseManager);
        entity.id = (0, uuid_1.v4)();
        entity.warehouse = { id: warehouseManagerDTO.warehouse.id };
        entity.age = moment().diff(entity.dob, `years`);
        entity.createdAt = new Date();
        entity = await this.warehouseManagerRepository.save(entity);
    }
    async findOne(id) {
        const warehouseManager = await this.warehouseManagerRepository.findOne(id, {
            relations: ['location', 'warehouse'],
        });
        return this.classMapper.map(warehouseManager, warehouse_manger_entity_1.WarehouseManager, warehouse_manger_dto_1.WarehouseManagerDTO);
    }
    async changeStates({ ids, status }) {
        await this.warehouseManagerRepository.query(`update warehouse_manager set status = '${status}' where id in (${ids
            .map((id) => `'${id}'`)
            .join(',')})`);
        return 'ok';
    }
    async update(id, warehouseManagerDTO) {
        let entity = this.classMapper.map(warehouseManagerDTO, warehouse_manger_dto_1.WarehouseManagerDTO, warehouse_manger_entity_1.WarehouseManager);
        entity.id = id;
        entity.warehouse = { id: warehouseManagerDTO.warehouse.id };
        entity.age = moment().diff(entity.dob, `years`);
        entity = await this.warehouseManagerRepository.save(entity);
    }
    async remove(id) {
        const warehouseManager = await this.warehouseManagerRepository.findOne(id);
        warehouseManager.deletedAt = new Date();
        warehouseManager.fname = '';
        warehouseManager.lname = '';
        warehouseManager.phone = '';
        await this.warehouseManagerRepository.save(warehouseManager);
        return 'done';
    }
    async getAll(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        if (filter === null || filter === void 0 ? void 0 : filter.includes('"')) {
            throw new common_1.BadRequestException('invalid filter');
        }
        const [results, count] = await this.warehouseManagerRepository
            .createQueryBuilder('warehouseManager')
            .innerJoin('warehouseManager.warehouse', 'warehouse')
            .skip(meta.rowsPerPage * (meta.page - 1))
            .take(meta.rowsPerPage)
            .select([
            'warehouseManager.id',
            'warehouseManager.fname',
            'warehouseManager.lname',
            'warehouseManager.phone',
            'warehouseManager.status',
            'warehouseManager.deletedAt',
            'warehouse.name',
            'warehouse.id',
        ])
            .where(`warehouseManager.deletedAt is null ${filter
            ? filter.includes('_@@')
                ? ` and warehouseManager.status = '${filter.replace('_@@', '')}'`
                : ` and warehouseManager.name like "%${filter}%"`
            : ''} `)
            .getManyAndCount();
        let managers = results.map((p) => this.classMapper.map(p, warehouse_manger_entity_1.WarehouseManager, warehouse_manger_dto_1.WarehouseManagerDTO));
        return { managers, count };
    }
};
ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(warehouse_manger_entity_1.WarehouseManager)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ManagerService);
exports.ManagerService = ManagerService;
//# sourceMappingURL=manager.service.js.map