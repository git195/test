import { BusinessUnitService } from '../../../../core/services/business-unit.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ModalService } from 'src/app/core/services/modal.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ReportingStructureLevel } from 'src/app/core/interfaces/reporting-structure-level';

@Component({
  selector: 'app-business-unit-tree',
  templateUrl: './business-unit-tree.component.html',
  styleUrls: ['./business-unit-tree.component.scss'],
})
export class BusinessUnitTreeComponent implements OnInit {
  businessUnit: ReportingStructureLevel;
  dataSource = new MatTreeNestedDataSource<ReportingStructureLevel>();
  treeControl = new NestedTreeControl<ReportingStructureLevel>(node => node.children);

  constructor(
    private businessUnitService: BusinessUnitService,
    private currentUserService: CurrentUserService,
    private modalService: ModalService
  ) {
    this.dataSource.data = this.currentUserService.reportingStructure;
  }

  ngOnInit() {
    this.businessUnit = this.businessUnitService.createBusinessUnit();
  }

  async dismiss() {
    await this.modalService.dismissModal(this.businessUnit);
  }

  hasChild = (_: number, node: ReportingStructureLevel) => !!node.children && node.children.length > 0;

  async setBusinessUnit(businessUnit: ReportingStructureLevel) {
    this.businessUnit = businessUnit;
    await this.dismiss();
  }
}