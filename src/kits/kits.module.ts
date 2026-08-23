import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from 'src/helpers/helpers.module';
import { Product } from 'src/product/entities/product.entity';
import { KitComponent } from './entities/kit-component.entity';
import { Kit } from './entities/kit.entity';
import { KitsController } from './kits.controller';
import { KitsService } from './kits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Kit, KitComponent, Product]), HelpersModule],
  controllers: [KitsController],
  providers: [KitsService],
  exports: [KitsService],
})
export class KitsModule {}
