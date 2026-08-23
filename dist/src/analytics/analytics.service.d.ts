import { ProductService } from 'src/product/product.service';
export declare class AnalyticsService {
    private readonly productService;
    constructor(productService: ProductService);
    getFeaturedProducts(): Promise<any>;
    getLatestTransactiosn(): Promise<any>;
    getActiveProducts(): Promise<any>;
    getRevenueSummary(): Promise<any>;
    getLast12Months(): Promise<{
        data: any[];
        thisYear: string;
        lastYear: string;
    }>;
}
