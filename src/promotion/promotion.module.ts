import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionProfile } from './promotion.mapper';
import { CaslModule } from 'src/casl/casl.module';
import { FilesCommonModule } from 'src/common/file/file-common.module';
import { EventsModule } from 'src/events/events.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { AdminPromotionController } from './admin-promotion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion]),
    HelpersModule,
    EventsModule,
    FilesCommonModule,
    CaslModule,
  ],
  controllers: [PromotionController,AdminPromotionController],
  providers: [PromotionService, PromotionProfile],
  exports:[PromotionService]
})
export class PromotionModule {}
