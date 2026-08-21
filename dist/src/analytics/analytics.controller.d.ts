import { HelpersService } from 'src/helpers/helpers.service';
import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    private readonly helpersService;
    private logger;
    constructor(analyticsService: AnalyticsService, helpersService: HelpersService);
    findAllProducts(res: any, req: any): Promise<import("../app-type").AppResponse>;
    findLatestTransactions(res: any, req: any): Promise<import("../app-type").AppResponse>;
    findActiveProducts(res: any, req: any): Promise<import("../app-type").AppResponse>;
    findRevenueSummary(res: any, req: any): Promise<import("../app-type").AppResponse>;
    getLast12(res: any, req: any): Promise<import("../app-type").AppResponse>;
}
