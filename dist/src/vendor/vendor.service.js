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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const typeorm_2 = require("typeorm");
const vendor_dto_1 = require("./vendor.dto");
const nestjs_1 = require("@automapper/nestjs");
const uuid_1 = require("uuid");
let VendorService = class VendorService {
    constructor(vendorRepository, classMapper) {
        this.vendorRepository = vendorRepository;
        this.classMapper = classMapper;
    }
    async createVendor(vendorDTO) {
        let entity = this.classMapper.map(vendorDTO, vendor_dto_1.VendorDTO, vendor_entity_1.Vendor);
        entity.id = (0, uuid_1.v4)();
        entity.warehouse = { id: vendorDTO.warehouse.id };
        entity.createdAt = new Date();
        entity = await this.vendorRepository.save(entity);
    }
    async findOne(id) {
        const vendor = await this.vendorRepository.findOne(id, {
            relations: ['location', 'warehouse'],
        });
        return this.classMapper.map(vendor, vendor_entity_1.Vendor, vendor_dto_1.VendorDTO);
    }
    async changeVendorsState({ ids, status }) {
        await this.vendorRepository.query(`update vendor set status = '${status}' where id in (${ids
            .map((id) => `'${id}'`)
            .join(',')})`);
        return 'ok';
    }
    async update(id, vendorDTO) {
        let entity = this.classMapper.map(vendorDTO, vendor_dto_1.VendorDTO, vendor_entity_1.Vendor);
        entity.id = id;
        entity.warehouse = { id: vendorDTO.warehouse.id };
        entity = await this.vendorRepository.save(entity);
    }
    async remove(id) {
        const vendor = await this.vendorRepository.findOne(id);
        vendor.deletedAt = new Date();
        vendor.name = '';
        await this.vendorRepository.save(vendor);
        return 'done';
    }
    async getVendors(filter, meta) {
        if (meta.rowsPerPage < 0 || meta.page < 0) {
            throw Error('Invalid pagination meta');
        }
        if (filter === null || filter === void 0 ? void 0 : filter.includes('"')) {
            throw new common_1.BadRequestException('invalid filter');
        }
        const [results, count] = await this.vendorRepository
            .createQueryBuilder('vendor')
            .skip(meta.rowsPerPage * (meta.page - 1))
            .take(meta.rowsPerPage)
            .select([
            'vendor.id',
            'vendor.name',
            'vendor.phone',
            'vendor.status',
            'vendor.managerName',
            'vendor.deletedAt',
        ])
            .where(`vendor.deletedAt is null ${filter
            ? filter.includes('_@@')
                ? ` and vendor.status = '${filter.replace('_@@', '')}'`
                : ` and vendor.name like "%${filter}%"`
            : ''} `)
            .getManyAndCount();
        let vendors = results.map((p) => this.classMapper.map(p, vendor_entity_1.Vendor, vendor_dto_1.VendorDTO));
        return { vendors, count };
    }
    async search(search) {
        let results = await this.vendorRepository
            .createQueryBuilder('vendor')
            .where('vendor.name like :search', {
            search: `%${search}%`,
        })
            .take(50)
            .orderBy('vendor.createdAt', 'DESC')
            .select([
            'vendor.id',
            'vendor.name',
            'vendor.phone',
            'vendor.status',
            'vendor.managerName',
            'vendor.deletedAt',
        ])
            .getMany();
        return results.map((p) => this.classMapper.map(p, vendor_entity_1.Vendor, vendor_dto_1.VendorDTO));
    }
};
VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=vendor.service.js.map