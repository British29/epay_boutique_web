import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [
        Validators.required, 
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
 ]]
    });
  }

  ngOnInit(): void {
  }

  postdata(angForm1: any) {
    this.dataService.userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/accueil';
          this.router.navigate([redirect]);
        },
        error => {
          alert("Erreur !!! mot de passe email incoorect");
        }
      );
  }

  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

}
