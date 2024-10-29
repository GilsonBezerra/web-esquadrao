import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Para o Guard funcionar, precisa implementar tanto home quanto o login
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'home',  loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'detalhes', loadChildren: () => import('./pages/detalhes/detalhes.module').then( m => m.DetalhesPageModule)},
  { path: 'agendamento', loadChildren: () => import('./pages/agendamento/agendamento.module').then( m => m.AgendamentoPageModule)},
  { path: 'servicos', loadChildren: () => import('./pages/servicos/servicos.module').then( m => m.ServicosPageModule)},
  { path: 'whatsapp', loadChildren: () => import('./pages/whatsapp/whatsapp.module').then( m => m.WhatsappPageModule)},
  { path: 'sobre', loadChildren: () => import('./pages/sobre/sobre.module').then( m => m.SobrePageModule)},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
