import { User } from 'src/users/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
export declare enum Presentation {
    NONE = "none",
    FEATURED = "featured",
    MAIN_PAGE = "main"
}
export declare enum ProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare enum Level {
    CATEGORY = "category",
    PRODUCT = "product",
    SUB_CATEGORY = "sub_category"
}
export declare class Product {
    id: string;
    name: string;
    vendor: Vendor;
    price: string;
    rewardRatio: number;
    unit: string;
    description: string;
    longDescription: string;
    status: string;
    type: string;
    presentation: Presentation;
    numAvail: number;
    numLeft: number;
    imageUrl: string;
    createdAt: Date;
    createdBy: User;
    parent: Product;
    sections: {
        [key: string]: string[];
    };
    level: Level;
}
