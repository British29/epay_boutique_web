import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from './users';
import { ArticlesModel } from './articles/articles.modal';
import { CommandeModel } from './commandes/commandes.modal';
import { EmailRenitialiserModel } from './recup-email/recup-email.modal';
import { MarchandPasswordRenitialiserModel } from './reni-password/reni-password.modal';
import { ClientModel } from './client/client.modal';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
  isLogin(url: string) {
    throw new Error('Méthode non implémentée.');
  }
  redirectUrl: any;
  baseUrl: string = "http://localhost/phpboutique";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }
  public userlogin(username: any, password: any) {

    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(map(Users => {
        this.setToken(Users[0].name);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }


  public ajouterArticles(designation: any, categories: any, quantite: any, prix: any, file: any) {
    const formData = new FormData();
    formData.append('designation', designation);
    formData.append('categories', categories);
    formData.append('quantite', quantite);
    formData.append('prix', prix);
    formData.append('file', file);
    return this.httpClient
      .post<any>(
        this.baseUrl + '/ajouterArticle.php',
        formData,
        { reportProgress: true }
      )
      .pipe(map(Article => {
        return Article;
      }));
  }


  //affichages des differents articles
  public affichageArticles(): Observable<ArticlesModel[]> {
    return this.httpClient.get<ArticlesModel[]>(this.baseUrl +
      '/afiichageAricles.php'
    );

  }


  //effacer un article de liste des affichages 
  deleteArticles(id: number) {
    return this.httpClient.delete<ArticlesModel>(this.baseUrl +
      '/deleteArticles.php?id=' + id
    );
  }


  //Modification d'un article 
  modifierArticle(id: number, data: any) {
    // const formData = new FormData();
    // formData.append('file', file);
    return this.httpClient
      .put<ArticlesModel>(
        this.baseUrl + '/modifierArticle.php?id='
        + id, data
      );
  }


  //Affichages des commandes articles
  public affichageCommande():
    Observable<CommandeModel[]> {
    return this.httpClient.get<CommandeModel[]>(this.baseUrl +
      '/afiichageCommande.php');

  }


  // Envoyer un message pour renitialiser son mot de passe
  public sendEmail(email: any) {
    return this.httpClient.post<EmailRenitialiserModel>(this.baseUrl +
      '/essais.php', { email }
    )
      .pipe(map(Email => {
        return Email;
      }))
  }


  // Modifier son mot passe à partir du email  
  modifierPassword(data: any) {
    return this.httpClient
      .put<MarchandPasswordRenitialiserModel>(
        this.baseUrl + '/modifierpassword.php'
        , data
      );
  }


  //Annuler une commande envoyer par le client
  annulerCommande(id: number) {
    return this.httpClient.delete<CommandeModel>(this.baseUrl +
      '/annulerCommande.php?id=' + id
    );
  }


  // Valider une commande envoyer par le client
  validerCommande(email: any, article: any) {
    return this.httpClient.post<CommandeModel>(this.baseUrl +
      '/validerCommande.php', { email, article }
    );
  }

  //Affichage de tout les clients
  public affichageClients(): Observable<ClientModel[]> {
    return this.httpClient.get<ClientModel[]>(this.baseUrl +
      '/affichageClient.php'
    );

  }



  //token
  setToken(userInfo: Users) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  getToken() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  deleteToken() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }

}