import { HelpersService } from 'src/helpers/helpers.service';
import { CreateKitDto } from './dto/create-kit.dto';
import { KitsService } from './kits.service';
export declare class KitsController {
    private readonly kitsService;
    private readonly helpers;
    private readonly logger;
    constructor(kitsService: KitsService, helpers: HelpersService);
    findByProductId(productId: string, res: any): Promise<import("../app-type").AppResponse>;
    create(dto: CreateKitDto, req: any, res: any): Promise<import("../app-type").AppResponse>;
}
