import 'reflect-metadata';
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';

const logger = new Logger('LoggingDecorator');

/**
 * `@ApmTransaction` decorator
 *
 *
 */
// tslint:disable-next-line: no-unused-vars
export function Logging(logger: Logger, msg: string) {
  // tslint:disable-next-line: only-arrow-functions
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    if (descriptor) {
      return _generateDescriptor(descriptor, propertyKey, msg);
    }
  };
}

function _generateDescriptor(
  descriptor: PropertyDescriptor,
  functionName: string,
  msg: string,
): PropertyDescriptor {
  // Save a reference to the original method
  const originalMethod = descriptor.value;
  // Rewrite original method with try/catch wrapper
  descriptor.value = async function (...args: any[]) {
    try {
      logger.log(`executing ${msg}`);
      return await originalMethod.apply(this, args);
    } finally {
        logger.log(`returning ${msg}`);
        
    }

    // return monitorAsyncWrapper(async () => originalMethod.apply(this, args), functionName, labels);
  };
  return descriptor;
}
