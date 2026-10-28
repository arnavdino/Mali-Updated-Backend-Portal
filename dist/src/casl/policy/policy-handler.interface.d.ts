import { AppAbility } from '../casl-ability.factory';
interface IPolicyHandler {
    handle(ability: AppAbility, service?: any): boolean;
}
declare type PolicyHandlerCallback = (ability: AppAbility) => boolean;
export declare type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export {};
