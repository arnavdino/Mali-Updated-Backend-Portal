export declare class KitComponentDto {
    componentName: string;
    quantityPerKit: number;
    unit: string;
}
export declare class CreateKitDto {
    name: string;
    reference: string;
    campaign: string;
    scenario: string;
    crop: string;
    coverageHectares: number;
    price: number;
    unitAdvanceFcfa?: number;
    repaymentQuantity?: number;
    repaymentUnit?: string;
    description?: string;
    categoryId?: string;
    isActive?: boolean;
    components: KitComponentDto[];
}
