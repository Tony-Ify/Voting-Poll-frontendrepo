import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';
import { NoAuthGuard } from './shared/no-auth.guard';

export const routes: Routes = [  
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard] 
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/user/user.module-module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];