import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseProfile } from './purchase.mapper';
import { EventsModule } from '../events/events.module';
import { CaslModule } from '../casl/casl.module';
import { ProductModule } from 'src/product/product.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { PurchaseAdminController } from './purchase-admin.controller';
import { PurchaseProduct } from './entities/purchase-product.entity';

@Module({
  imports: [
    HelpersModule,
    TypeOrmModule.forFeature([Purchase]),
    TypeOrmModule.forFeature([PurchaseProduct]),
    EventsModule,
    CaslModule,
    ProductModule,
    StripeModule,
  ],
  controllers: [PurchaseController, PurchaseAdminController],
  providers: [PurchaseService, PurchaseProfile],
})
export class PurchaseModule {}
