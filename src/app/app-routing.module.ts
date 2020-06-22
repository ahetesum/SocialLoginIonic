import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './services/auth-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: 'public',
    loadChildren: () => import('./public/public-routing.module').then( m => m.PublicRoutingModule)
  },

  {
    path: 'members',
    canActivate: [AuthGaurdService],
    loadChildren: () => import('./members/member-routing.module').then( m => m.MemberRoutingModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
