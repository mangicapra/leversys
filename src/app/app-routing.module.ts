import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@core/guards';
import { AuthGuard } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./feature/store/store.module').then((mod) => mod.StoreModule),
    data: { roles: ['store'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin.module').then((mod) => mod.AdminModule),
    data: { roles: ['admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
