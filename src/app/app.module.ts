import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ButtonModule }  from 'primeng/button';
import { DialogModule }  from 'primeng/dialog';
import { DataGridModule } from 'primeng/datagrid';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToolbarModule } from 'primeng/toolbar';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


import { AppComponent } from './app.component';
import { PromoService } from './services/promo.service';
import { PromoListComponent } from './promo/promo-list/promo-list.component';
import { PromoDetailComponent } from './promo/promo-detail/promo-detail.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PromoListComponent,
    PromoDetailComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    DataGridModule,
    PanelModule,
    ProgressBarModule,
    ToolbarModule,
    FieldsetModule,
    GrowlModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    PromoService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
