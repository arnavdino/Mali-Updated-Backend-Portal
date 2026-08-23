import 'reflect-metadata';
import { Logger } from '@nestjs/common';
export declare function Logging(logger: Logger, msg: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
