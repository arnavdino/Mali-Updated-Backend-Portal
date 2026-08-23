import { RawRuleOf } from '@casl/ability';
import { AppAbility } from 'src/casl/casl-ability.factory';
export declare class RoleDto {
    id: number;
    permissions: RawRuleOf<AppAbility>[];
    name: string;
    description: string;
    isCustom: boolean;
}
