import { FormGroup } from '@angular/forms';

export interface ElementComponentBase<T> {
    element: T;
    formGroup: FormGroup;
}