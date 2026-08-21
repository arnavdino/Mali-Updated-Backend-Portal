import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseManager } from './entities/warehouse.manger.entity';
import { AdminVendorController } from './admin-vendor.controller';
import { VendorMapper } from './vendor.mapper';
import { HelpersModule } from 'src/helpers/helpers.module';
import { CaslModule } from 'src/casl/casl.module';
import { WarehouseService } from './warehouse.service';
import { AdminWarehouseController } from './admin-warehouse.controller';
import { AdminManagerController } from './admin-manager.controller copy';
import { ManagerService } from './manager.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor, Warehouse, WarehouseManager]),
    HelpersModule,
    CaslModule,
  ],
  controllers: [AdminVendorController, AdminWarehouseController,AdminManagerController],
  providers: [VendorService, VendorMapper, WarehouseService,ManagerService],
})
export class VendorModule {}
