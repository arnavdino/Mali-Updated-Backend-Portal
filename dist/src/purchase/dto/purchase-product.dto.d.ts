import { CreateProductDto } from 'src/product/dto/create-product.dto';
export declare class PurchaseProductDTO {
    id: string;
    product: CreateProductDto;
    total: number;
    quantity: number;
    notes: string;
}
