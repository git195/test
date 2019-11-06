import { BusinessUnit } from '../business-unit';
import { BusinessUnitService } from '../../../../core/services/business-unit.service';
import { BusinessUnitTreeComponent } from '../business-unit-tree/business-unit-tree.component';
import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../../element-component';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { ReportingStructureLevel } from 'src/app/core/interfaces/reporting-structure-level';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit-text.component.html',
  styleUrls: ['./business-unit-text.component.scss'],
})
export class BusinessUnitTextComponent implements OnInit, ElementComponentBase<BusinessUnit> {
  @Input() formGroup: FormGroup;

  businessUnit: ReportingStructureLevel;
  businessUnitIdKey: string;
  element: BusinessUnit;

  constructor(private businessUnitService: BusinessUnitService, private modalService: ModalService) { }

  ngOnInit() {
    this.businessUnit = this.businessUnitService.createBusinessUnit();
    this.businessUnitIdKey = BusinessUnit.idKey;
  }

  async presentModal() {
    await this.modalService.presentModal(BusinessUnitTreeComponent);
    const { data } = await this.modalService.modal.onWillDismiss();
    this.businessUnit = data === undefined ? this.businessUnitService.createBusinessUnit() : data;
    this.formGroup.get(BusinessUnit.idKey).setValue(this.businessUnit.id);
  }
}