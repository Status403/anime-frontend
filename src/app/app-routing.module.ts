import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientShellComponent } from './layouts/client-shell.component';
import { OnepieceComponent } from './components/onepiece/onepiece.component';

const routes: Routes = [
  {path: '', component: ClientShellComponent, children: [
    {path: '', component: OnepieceComponent}
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
