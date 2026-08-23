import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductKind, ProductStatus, Level } from 'src/product/entities/product.entity';
import { User } from 'src/users/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { In, Repository } from 'typeorm';
import { CreateKitDto } from './dto/create-kit.dto';
import { KitComponent } from './entities/kit-component.entity';
import { Kit } from './entities/kit.entity';

@Injectable()
export class KitsService {
  constructor(
    @InjectRepository(Kit) private readonly kitRepo: Repository<Kit>,
    @InjectRepository(KitComponent) private readonly componentRepo: Repository<KitComponent>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async create(user: User, dto: CreateKitDto) {
    const componentIds = dto.components.map((component) => component.productId);
    if (new Set(componentIds).size !== componentIds.length) {
      throw new BadRequestException('A kit component can only be included once.');
    }

    const components = await this.productRepo.find({ where: { id: In(componentIds) } });
    if (components.length !== componentIds.length) {
      throw new BadRequestException('One or more kit components do not exist.');
    }
    if (components.some((component) => component.productKind === ProductKind.KIT)) {
      throw new BadRequestException('A kit cannot contain another kit.');
    }
    if (await this.kitRepo.findOne({ where: { reference: dto.reference } })) {
      throw new BadRequestException(`Kit reference "${dto.reference}" already exists.`);
    }

    const product = this.productRepo.create({
      id: uuidv4(), name: dto.name, price: dto.price as any,
      description: dto.description || dto.scenario, longDescription: dto.description || null,
      status: dto.isActive === false ? ProductStatus.INACTIVE : ProductStatus.ACTIVE,
      type: 'product', productKind: ProductKind.KIT, tracksInventory: false,
      unit: 'kit', numAvail: 0, numLeft: 0, imageUrl: '', level: Level.PRODUCT,
      createdBy: { id: user.id } as User,
      ...(dto.categoryId ? { parent: { id: dto.categoryId } as Product } : {}),
    });

    const kit = this.kitRepo.create({
      id: uuidv4(), product, reference: dto.reference, campaign: dto.campaign,
      scenario: dto.scenario, crop: dto.crop, coverageHectares: dto.coverageHectares as any,
      unitAdvanceFcfa: (dto.unitAdvanceFcfa || 0) as any,
      repaymentQuantity: (dto.repaymentQuantity || 0) as any,
      repaymentUnit: dto.repaymentUnit || 'kg', isActive: dto.isActive !== false,
    });
    await this.kitRepo.save(kit);
    await this.componentRepo.save(dto.components.map((component, index) => this.componentRepo.create({
      kit: { id: kit.id } as Kit,
      product: { id: component.productId } as Product,
      quantityPerKit: component.quantityPerKit as any,
      unit: component.unit,
      displayOrder: index,
    })));
    return { id: product.id };
  }
}
