import { RawRuleOf } from '@casl/ability';
import { AppAbility } from '../casl/casl-ability.factory';
export declare class RoleEntity {
    id: number;
    permissions: RawRuleOf<AppAbility>[];
    name: string;
    description: string;
    isCustom: boolean;
}
