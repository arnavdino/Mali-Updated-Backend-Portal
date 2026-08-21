import { MongoAbility, ForcedSubject } from '@casl/ability';
import { User } from '../users/user.entity';
import { PermissionAction, PermissionSubject } from '../permissions/permissions';
declare const actions: PermissionAction[];
declare const subjects: PermissionSubject[];
declare type Abilities = [
    typeof actions[number],
    (typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>)
];
export declare type AppAbility = MongoAbility<Abilities>;
export declare class CaslAbilityFactory {
    createForUser(user: User): MongoAbility<Abilities, import("@casl/ability").MongoQuery<import("@casl/ability/dist/types/types").AnyObject>>;
}
export {};
