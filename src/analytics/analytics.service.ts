import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly productService: ProductService) {}

  async getFeaturedProducts() {
    return await this.productService.getFeaturedProducts();
  }

  async getLatestTransactiosn() {
    return await this.productService.getLast10Transactions();
  }

  async getActiveProducts() {
    return await this.productService.getActiveProducts();
  }

  async getRevenueSummary() {
    return await this.productService.getRevenueSummary();
  }
  async getLast12Months() {
    return await this.productService.getLast12Months();
  }
}
