import { ProductService } from './product.service';
import { HelpersService } from '../helpers/helpers.service';
import { FilesService } from '../common/file/files.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductAdminController {
    private readonly productService;
    private readonly helpersService;
    private readonly fileService;
    private logger;
    constructor(productService: ProductService, helpersService: HelpersService, fileService: FilesService);
    findAllProducts(res: any, req: any, filter: string, rowsPerPage: number, page: number): Promise<import("../app-type").AppResponse>;
    searchCategories(search: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    findCategories(res: any, req: any, filter: string, parentId: string, include: boolean): Promise<import("../app-type").AppResponse>;
    create(createProductDto: CreateProductDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    uploadItem(req: any, res: any, file: any): Promise<any>;
    update(id: string, updateProductDto: CreateProductDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    remove(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    batchRemove(ids: string[], res: any, req: any): Promise<import("../app-type").AppResponse>;
    changeState(ids: string[], res: any, req: any): Promise<import("../app-type").AppResponse>;
}
