import { ActionProperty } from './action-property';
import { FormAnswer } from './form-answer';

export interface Answer {
    actionFormsAnswer: Array<Array<ActionProperty>>;
    formAnswer: FormAnswer
}