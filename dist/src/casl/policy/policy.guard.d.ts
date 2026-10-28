import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl-ability.factory';
export declare class PoliciesGuard implements CanActivate {
    private reflector;
    private caslAbilityFactory;
    private readonly logger;
    constructor(reflector: Reflector, caslAbilityFactory: CaslAbilityFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
    checkPermission(user: any, action: any, subj: any, object: any): boolean;
    private execPolicyHandler;
}
