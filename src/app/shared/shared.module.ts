import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component/navbar.component';
import { FooterComponent } from './footer.component/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner.component/loading-spinner.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LoadingSpinnerComponent,
    FooterComponent,
    NavbarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    LoadingSpinnerComponent
  ],
})
export class SharedModule {}