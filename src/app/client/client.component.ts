import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ClientModel } from './client.modal';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  ClientModelObj: ClientModel = new ClientModel();

  ClientData !: any;



  constructor(private dataservice: ApiService) { }

  ngOnInit(): void {
    this.affichageAllClients();

  }

  affichageAllClients() {
    this.dataservice.affichageClients()
      .subscribe(res => {
        this.ClientData = res;
        console.log(res);
      })

  }

}
