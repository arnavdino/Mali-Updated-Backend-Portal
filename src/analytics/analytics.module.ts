import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { HelpersModule } from 'src/helpers/helpers.module';
import { ProductModule } from 'src/product/product.module';
import { PurchaseModule } from 'src/purchase/purchase.module';
import { CaslModule } from 'src/casl/casl.module';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [HelpersModule, ProductModule, PurchaseModule, CaslModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
