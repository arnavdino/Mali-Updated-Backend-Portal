import { ProductService } from './product.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';
export declare class ProductController {
    private readonly productService;
    private readonly helpersService;
    private readonly fileService;
    private logger;
    constructor(productService: ProductService, helpersService: HelpersService, fileService: FilesService);
    findUserProducts(res: any, req: any, filter: string): Promise<import("../app-type").AppResponse>;
    findMain(res: any, req: any): Promise<import("../app-type").AppResponse>;
    search(search: string, category: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    findOne(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
}
