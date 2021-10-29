import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './auth.guard';
import { ClientComponent } from './client/client.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LoginComponent } from './login/login.component';
import { RecupEmailComponent } from './recup-email/recup-email.component';
import { ReniPasswordComponent } from './reni-password/reni-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'commandes', component: CommandesComponent, canActivate: [AuthGuard] },
  { path: 'recup-email', component: RecupEmailComponent },
  { path: 'recup-password', component: ReniPasswordComponent },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
