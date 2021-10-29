import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../api.service';
import { MarchandPasswordRenitialiserModel } from './reni-password.modal';

@Component({
  selector: 'app-reni-password',
  templateUrl: './reni-password.component.html',
  styleUrls: ['./reni-password.component.css']
})
export class ReniPasswordComponent implements OnInit {


  angFormPass!: FormGroup;
  passModelObj: MarchandPasswordRenitialiserModel = new MarchandPasswordRenitialiserModel;


  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {


    this.angFormPass = this.fb.group({
  
      password: [''],
    })

  }

  updatePassword() {
    this.passModelObj.password = this.angFormPass.value.password;
    this.dataService.modifierPassword(this.passModelObj)
      .subscribe(data => {
        alert('mot de passe à été modifier');
        const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/login';
        this.router.navigate([redirect]);
      })
  }

}
