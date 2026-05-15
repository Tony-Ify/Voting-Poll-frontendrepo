import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component/navbar.component';
import { FooterComponent } from './footer.component/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner.component/loading-spinner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}