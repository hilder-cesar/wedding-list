import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/public/public.module').then(m => m.PublicModule) },
  { path: 'app', loadChildren: () => import('src/app/private/private.module').then(m => m.PrivateModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
