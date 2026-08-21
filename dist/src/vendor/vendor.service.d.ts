import { MetaParam } from 'src/common/file/interfaces';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { VendorDTO } from './vendor.dto';
import { Mapper } from '@automapper/core';
export declare class VendorService {
    private vendorRepository;
    private readonly classMapper;
    constructor(vendorRepository: Repository<Vendor>, classMapper: Mapper);
    createVendor(vendorDTO: VendorDTO): Promise<void>;
    findOne(id: string): Promise<VendorDTO>;
    changeVendorsState({ ids, status }: {
        ids: string[];
        status: string;
    }): Promise<string>;
    update(id: string, vendorDTO: VendorDTO): Promise<void>;
    remove(id: string): Promise<string>;
    getVendors(filter: string, meta: MetaParam): Promise<{
        vendors: VendorDTO[];
        count: number;
    }>;
    search(search: string): Promise<VendorDTO[]>;
}
