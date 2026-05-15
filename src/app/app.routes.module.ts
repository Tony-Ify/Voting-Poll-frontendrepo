import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'polls/:id',
    loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'results/:id',
    loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/user/user.module-module').then(m => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}