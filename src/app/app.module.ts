import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ArticlesComponent } from './articles/articles.component';
import { CommandesComponent } from './commandes/commandes.component';
import { RecupEmailComponent } from './recup-email/recup-email.component';
import { ReniPasswordComponent } from './reni-password/reni-password.component';
import { AuthGuard } from './auth.guard';
import { ClientComponent } from './client/client.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    ArticlesComponent,
    CommandesComponent,
    RecupEmailComponent,
    ReniPasswordComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
