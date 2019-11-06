import { CoreModule } from '../core/core.module';
import { IonicModule } from '@ionic/angular';
import { ModulesComponent } from './modules.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ModulesComponent],
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        component: ModulesComponent,
        path: ''
      }
    ])
  ]
})
export class ModulesModule { }
