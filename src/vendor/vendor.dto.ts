import { AutoMap } from '@automapper/classes';
import { ProductStatus } from 'src/product/entities/product.entity';
import { LocationDTO } from 'src/users/location.dto';
import { WarehouseDTO } from './warehouse.dto';

export class VendorDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  managerName: string;

  @AutoMap()
  organization: string;
  @AutoMap()
  methodOfPayment: string;
  @AutoMap()
  methodOfDelivery: string;
  @AutoMap()
  methodOfSupply: string;
  @AutoMap()
  phone: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  status: ProductStatus;

  @AutoMap()
  transportContract: string;
  // Basic services to producers
  @AutoMap()
  baseServices: string;
  // Seeds (Varieties)
  @AutoMap()
  seeds: string;
  // Fertilizer (Type)
  @AutoMap()
  fertilizer: string;
  // Herbicide (Type)
  @AutoMap()
  herbicide: string;
  // Phytosanitary product (type)
  @AutoMap()
  phytosanitaryProduct: string;
  // Plowing
  @AutoMap()
  plowing: string;
  // Semi
  @AutoMap()
  semi: string;
  // Fertilizer spreading
  @AutoMap()
  fertilizerSpreading: string;
  // Phyto treatment
  @AutoMap()
  phytoTreatment: string;
  // Small equipment (types)
  @AutoMap()
  smallEquipment: string;
  // Insurance (types)
  @AutoMap()
  insurance: string;

  @AutoMap()
  location: LocationDTO;

  @AutoMap()
  productSupplied: string;
  @AutoMap()
  productPurchased: string;

  @AutoMap()
  warehouse: WarehouseDTO;
}
