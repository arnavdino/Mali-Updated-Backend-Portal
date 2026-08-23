import { HelpersService } from 'src/helpers/helpers.service';
import { EventService } from './event.service';
export declare class EventsController {
    private readonly helperService;
    private eventService;
    private readonly logger;
    constructor(helperService: HelpersService, eventService: EventService);
    addEventV2(req: any, res: any, payload: {
        data: any;
        name: string;
    }): Promise<import("../app-type").AppResponse>;
    empty(): Promise<string>;
}
