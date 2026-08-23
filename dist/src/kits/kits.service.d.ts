import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateKitDto } from './dto/create-kit.dto';
import { KitComponent } from './entities/kit-component.entity';
import { Kit } from './entities/kit.entity';
export declare class KitsService {
    private readonly kitRepo;
    private readonly componentRepo;
    private readonly productRepo;
    constructor(kitRepo: Repository<Kit>, componentRepo: Repository<KitComponent>, productRepo: Repository<Product>);
    create(user: User, dto: CreateKitDto): Promise<{
        id: string;
    }>;
}
