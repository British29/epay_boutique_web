import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ArticlesModel } from './articles.modal';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  angForm !: FormGroup;
  artcleModelObj: ArticlesModel = new ArticlesModel();
  ArticlesData !: any;
  route: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  myFile: any;


  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.angForm = this.fb.group({
      id: [''],
      designation: [''],
      categories: [''],
      quantite: [''],
      prix: [''],
      file: [''],

    });
    this.affichageAllArticle();


  }


  //Deconnexion 

  deConnecter() {
    this.dataService.deleteToken();
    this.router.navigateByUrl('/login');
  }


  //Mes different
  clickAjoutArticles() {
    this.angForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  // afficher la liste de toute les ARTICLES
  postarticledata(angForm: any) {
    this.dataService.ajouterArticles(
      angForm.value.designation,
      angForm.value.categories,
      angForm.value.quantite,
      angForm.value.prix,
      this.myFile
    )
      .pipe(first())
      .subscribe(
        _data => {
          let ref = document.getElementById('cancel');
          ref?.click();
          this.angForm.reset();
          alert('Enregistrer');
          this.affichageAllArticle();
        },
        _error => {

          alert('Pas enregister');
          this.angForm.reset();
        });
    this.angForm.reset();
  }


  // Supprimer un ARTCILE
  supprimerArticles(row: any) {
    this.dataService.deleteArticles(row.id)
      .subscribe(res => {
        console.log('supprimer');
        alert("Article supprimé");
        this.affichageAllArticle();
      })
  }

  //ajouter une image de l'ARTICLE
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.myFile = file;
    console.log(file);
  }

  affichageAllArticle() {
    this.dataService
      .affichageArticles()
      .subscribe(res => {
        this.ArticlesData = res;
      })
  }

  // modifier un ARTICLE 
  updateArticle() {
    this.artcleModelObj.designation = this.angForm.value.designation;
    this.artcleModelObj.categories = this.angForm.value.categories;
    this.artcleModelObj.quantite = this.angForm.value.quantite;
    this.artcleModelObj.prix = this.angForm.value.prix;
    this.dataService.modifierArticle(this.artcleModelObj.id,
      this.artcleModelObj,
    )
      .subscribe(data => {
        console.log(data);
        alert("modifier avec succès");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.affichageAllArticle();
      })
  }

  // recuperer la liste de tout les Articles
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.artcleModelObj.id = row.id;
    this.angForm.controls["designation"].setValue(row.designation);
    this.angForm.controls["categories"].setValue(row.categories);
    this.angForm.controls["quantite"].setValue(row.quantite);
    this.angForm.controls["prix"].setValue(row.prix);
  }




}
