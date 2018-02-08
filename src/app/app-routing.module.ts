import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PromoListComponent } from './promo/promo-list/promo-list.component';
import { PromoDetailComponent } from './promo/promo-detail/promo-detail.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/promos', pathMatch: 'full' },
  { path: 'promos', component: PromoListComponent },
  { path: 'promos/:id', component: PromoDetailComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
