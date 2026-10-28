import { Product } from 'src/product/entities/product.entity';
import { KitComponent } from './kit-component.entity';
export declare class Kit {
    id: string;
    product: Product;
    reference: string;
    campaign: string;
    scenario: string;
    crop: string;
    coverageHectares: string;
    unitAdvanceFcfa: string;
    repaymentQuantity: string;
    repaymentUnit: string;
    isActive: boolean;
    createdAt: Date;
    components: KitComponent[];
}
