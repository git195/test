import { ActionFormComponent } from './elements/action/action-form/action-form.component';
import { CoreModule } from '../core/core.module';
import { ElementComponent } from './elements/element.component';
import { ElementTemplateDirective } from './elements/element-template.directive';
import { FormComponent } from './form.component';
import { FormOneComponent } from '../form-one/form-one.component';
import { NgModule } from '@angular/core';
import { routeNames } from '../core/constants/route-names';
import { RouterModule } from '@angular/router';
import { SectionHeadingComponent } from './elements/section-heading/section-heading.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ActionFormComponent,
    ElementComponent,
    ElementTemplateDirective,
    FormComponent,
    FormOneComponent,
    SectionHeadingComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild([
      {
        component: FormOneComponent,
        path: ''
      },
      {
        component: ActionFormComponent,
        path: routeNames.actionForm
      }
    ])
  ]
})
export class FormsModule { }
