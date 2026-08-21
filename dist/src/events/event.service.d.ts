import { Repository } from 'typeorm';
import { Event } from './event.entity';
export declare class EventService {
    private eventRepo;
    constructor(eventRepo: Repository<Event>);
    addEvent({ userId, name, data, }: {
        userId: string;
        storeId?: string;
        name: string;
        data: {
            [key: string]: string;
        };
        postId?: number;
    }): Promise<void>;
}
