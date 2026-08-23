import { AutomapperProfile } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ProductService } from 'src/product/product.service';
export declare class PurchaseProfile extends AutomapperProfile {
    private readonly productService;
    constructor(mapper: Mapper, productService: ProductService);
    get profile(): (mapper: any) => void;
}
