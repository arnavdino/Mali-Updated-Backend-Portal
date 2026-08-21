import { Logger } from '@nestjs/common';
import { AppResponse } from 'src/app-type';
export declare class HelpersService {
    formatResponse(logger: Logger, dataPromise: Promise<any>, response: any, endpoint: string): Promise<AppResponse>;
    isNumber(value: string): boolean;
    capitalizeFirstLetter(word: string): string;
}
