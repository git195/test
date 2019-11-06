import { Moment } from 'moment';

export interface Action {
    action: string,
    completed?: boolean,
    completedDate?: Moment,
    description?: string,
    dueDate: Moment,
    owner: string
}