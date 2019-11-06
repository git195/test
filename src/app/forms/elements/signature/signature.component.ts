import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { Signature } from './signature';
import { SignatureType } from 'src/app/core/enumerations/signature-type';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit, ElementComponentBase<Signature> {
  @Input() formGroup: FormGroup;

  element: Signature;
  signature: string;

  constructor() { }

  async ngOnInit() {
    if (this.element.signatureType === SignatureType.SpecificUser && this.element.signatureUser !== undefined) {
      this.signature = this.element.signatureUser.fullName;
    }
  }
}
