import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SignInService } from './sign-in.service';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        component: SignInComponent,
        path: ''
      }
    ])
  ],
  providers: [SignInService]
})
export class SignInModule { }
