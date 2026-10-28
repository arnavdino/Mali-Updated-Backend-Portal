import { PromotionService } from './promotion.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';
export declare class PromotionController {
    private readonly promotionService;
    private readonly helpersService;
    private readonly fileService;
    private logger;
    constructor(promotionService: PromotionService, helpersService: HelpersService, fileService: FilesService);
    findAll(res: any, req: any): Promise<import("../app-type").AppResponse>;
    findOne(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
}
