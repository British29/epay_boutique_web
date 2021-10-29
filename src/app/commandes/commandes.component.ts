import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { CommandeModel } from './commandes.modal';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  commandeModelObj: CommandeModel = new CommandeModel();
  CommandeData !: any;
  angFormCommande!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: ApiService,) {

  }

  ngOnInit(): void {
    this.angFormCommande = this.fb.group({
      id: [''],
      email: [''],
      article: [''],

    });
    this.affichageAllCommandes();
  }


  affichageAllCommandes() {
    this.dataService
      .affichageCommande()
      .subscribe(res => {
        this.CommandeData = res;
        console.log(res);
      });
  }


  // Annuler une commande
  annulerCommandes(row: any) {
    this.dataService.annulerCommande(row.id)
      .subscribe(res => {
        console.log('annuler');
        alert("Commande annuler");
        this.affichageAllCommandes();
      })
  }



  valider(angFormCommande: any) {
    this.dataService.validerCommande(angFormCommande.value.email, angFormCommande.value.article)
      .pipe(first())
      .subscribe(
        data => {
          alert('La commande validée');
          console.log(data);
          let ref = document.getElementById('cancel');
          ref?.click();
        },
        error => {
          alert('Pas enregistrer');
        });
  }


  onEdit(row: any) {
    this.commandeModelObj.id = row.id;
    this.angFormCommande.controls["email"].setValue(row.email);
    this.angFormCommande.controls["article"].setValue(row.article);
  }

}
