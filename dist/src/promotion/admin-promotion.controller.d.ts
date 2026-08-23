import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { HelpersService } from '../helpers/helpers.service';
import { FilesService } from '../common/file/files.service';
export declare class AdminPromotionController {
    private readonly promotionService;
    private readonly helpersService;
    private readonly fileService;
    private logger;
    constructor(promotionService: PromotionService, helpersService: HelpersService, fileService: FilesService);
    create(createProductDto: CreatePromotionDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    uploadItem(req: any, res: any, file: any): Promise<any>;
    findProductForPromotion(res: any, req: any, filter: string): Promise<import("../app-type").AppResponse>;
    findAll(res: any, req: any, filter: string, rowsPerPage: number, page: number): Promise<import("../app-type").AppResponse>;
    findOne(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    update(id: string, updateProductDto: CreatePromotionDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    remove(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
}
