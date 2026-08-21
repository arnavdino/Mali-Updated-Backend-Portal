import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { HelpersModule } from 'src/helpers/helpers.module';
import { EventsModule } from 'src/events/events.module';
import { CaslModule } from 'src/casl/casl.module';
import { ProductProfile } from './product.mapper';
import { FilesCommonModule } from 'src/common/file/file-common.module';
import { PromotionModule } from 'src/promotion/promotion.module';
import { ProductAdminController } from './product-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    HelpersModule,
    EventsModule,
    FilesCommonModule,
    CaslModule,
    PromotionModule,
  ],
  controllers: [ProductController, ProductAdminController],
  providers: [ProductService, ProductProfile],
  exports: [ProductService],
})
export class ProductModule {}
