import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    UserRoutingModule,
  ],
})
export class UserModule {}