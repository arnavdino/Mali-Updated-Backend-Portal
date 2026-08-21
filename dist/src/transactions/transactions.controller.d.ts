import { TransactionsService } from './transactions.service';
import { HelpersService } from '../helpers/helpers.service';
import { TransactionsDto } from './transactions.dto';
export declare class TransactionsController {
    private readonly transactionService;
    private readonly appService;
    private readonly logger;
    constructor(transactionService: TransactionsService, appService: HelpersService);
    createTransaction(transaction: TransactionsDto, req: any, res: any): Promise<import("../app-type").AppResponse>;
    editTransaction(transaction: TransactionsDto, req: any, res: any): Promise<import("../app-type").AppResponse>;
    getTransaction(req: any, res: any): Promise<import("../app-type").AppResponse>;
    findAll(res: any, req: any, from: string, to: string, type: string, customer: string, id: string, state: string, page: number, rowsPerPage: number): Promise<import("../app-type").AppResponse>;
}
