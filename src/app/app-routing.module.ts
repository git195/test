import { ActionFormComponent } from './forms/elements/action/action-form/action-form.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { routeNames } from './core/constants/route-names';
import { SignedInGuard } from './core/services/signed-in-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: routeNames.signIn,
    pathMatch: 'full'
  },
  {
    canActivate: [SignedInGuard],
    path: routeNames.formOne,
    loadChildren: './forms/forms.module#FormsModule'
  },
  {
    canActivate: [SignedInGuard],
    path: routeNames.modules,
    loadChildren: './modules/modules.module#ModulesModule'
  },
  {
    path: routeNames.signIn,
    loadChildren: './sign-in/sign-in.module#SignInModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
