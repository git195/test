import * as _ from 'lodash';
import { Action as ActionInterface } from 'src/app/core/interfaces/action';
import { Action } from 'src/app/forms/elements/action/action';
import { ActionBindValues } from '../enumerations/action-bind-values';
import { ElementBase } from 'src/app/forms/elements/element-base';
import { events } from '../constants/events';
import { Events } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ActionService {
    public get actionCalculatedKey() : string {
        const actionKeyPrefix = 'sf';
        const actionKeySuffix = this.actionKey.replace(actionKeyPrefix, '');

        return `${actionKeyPrefix}${this.actionTemplateId}${actionKeySuffix}`;
    }

    private _actionElement : Action;
    public get actionElement() : Action {
        return this._actionElement;
    }
    public set actionElement(value : Action) {
        this._actionElement = value;
    }

    private _actionElements : Array<ElementBase<any>>;
    public get actionElements() : Array<ElementBase<any>> {
        return this._actionElements;
    }
    public set actionElements(value : Array<ElementBase<any>>) {
        this._actionElements = value;
    }
    
    private _actionKey : string;
    public get actionKey() : string {
        return this._actionKey;
    }
    public set actionKey(value : string) {
        this._actionKey = value;
    }

    private _actionTemplateId : number;
    public get actionTemplateId() : number {
        return this._actionTemplateId;
    }
    public set actionTemplateId(value : number) {
        this._actionTemplateId = value;
    }
    
    private _currentActionIndex : number;
    public get currentActionIndex() : number {
        return this._currentActionIndex;
    }
    public set currentActionIndex(value : number) {
        this._currentActionIndex = value;
    }

    public get isEditingAction() : boolean {
        return this.currentActionIndex !== undefined;
    }  
    
    private _isNavigatingToModules : boolean;
    public get isNavigatingToModules() : boolean {
        return this._isNavigatingToModules;
    }
    public set isNavigatingToModules(value : boolean) {
        this._isNavigatingToModules = value;
    }
    
    private _parentFormGroup : FormGroup;
    public get parentFormGroup() : FormGroup {
        return this._parentFormGroup;
    }
    public set parentFormGroup(value : FormGroup) {
        this._parentFormGroup = value;
    }
    
    constructor(private events: Events) { }

    deleteAction(actionIndex: number): void {
        const actions: Array<FormGroup> = this.parentFormGroup.get(this.actionKey).value;

        if (actions === null) {
            return;
        }

        actions.splice(actionIndex, 1);

        this.parentFormGroup.get(this.actionKey).setValue(actions);
        this.events.publish(events.actionsUpdated);
    }

    getActionFormGroup(): FormGroup {
        const actionFormGroups = <Array<FormGroup>>this.parentFormGroup.get(this.actionKey).value;
        return actionFormGroups[this.currentActionIndex];
    }

    getActions(): Array<ActionInterface> {
        const actionFormGroups = <Array<FormGroup>>this.parentFormGroup.get(this.actionKey).value;

        return _.chain(actionFormGroups)
            .map(f => {
                let action: ActionInterface = {
                    action: f.get(ActionBindValues.Action).value,
                    dueDate: f.get(ActionBindValues.DueDate).value,
                    owner: 'Khoi Nguyen'
                };
                return action;
            }).value();
    }

    storeAction(formGroup: FormGroup): void {
        let actions: Array<FormGroup> = this.parentFormGroup.get(this.actionKey).value;

        if (actions === null) {
            actions = new Array<FormGroup>();
        }

        if (this.isEditingAction) {
            actions[this.currentActionIndex] = formGroup;
            this.currentActionIndex = undefined;
        } else {
            actions.push(formGroup);
        }

        this.parentFormGroup.get(this.actionKey).setValue(actions);
        this.events.publish(events.actionsUpdated);
    }
}