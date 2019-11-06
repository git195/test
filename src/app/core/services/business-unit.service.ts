import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { ReportingStructureLevel } from 'src/app/core/interfaces/reporting-structure-level';
import { CurrentUserService } from 'src/app/core/services/current-user.service';

@Injectable({
    providedIn: 'root'
})
export class BusinessUnitService {
    constructor(private currentUserService: CurrentUserService) { }

    createBusinessUnit(id?: number, name?: string): ReportingStructureLevel {
        return {
            id: id,
            name: name
        };
    }

    createBusinessUnitValue(id: number, name: string): Array<ReportingStructureLevel> {
        const value: ReportingStructureLevel = {
            id: id,
            name: name
        };

        return new Array(value);
    }
}