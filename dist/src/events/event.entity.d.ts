import { User } from '../users/user.entity';
export declare class Event {
    id: number;
    user: User;
    eventName: string;
    data: string;
    createdAt: Date;
}
