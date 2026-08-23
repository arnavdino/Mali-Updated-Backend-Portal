import { Product } from 'src/product/entities/product.entity';
import { Kit } from './kit.entity';
export declare class KitComponent {
    id: number;
    kit: Kit;
    product: Product;
    quantityPerKit: string;
    unit: string;
    displayOrder: number;
}
