import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recup-email',
  templateUrl: './recup-email.component.html',
  styleUrls: ['./recup-email.component.css']
})
export class RecupEmailComponent implements OnInit {
  emailForm!: FormGroup;

  constructor(private dataservice: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: [''],
    })

  }

  postEmailRecuperation(emailForm1: any) {
    this.dataservice.sendEmail(emailForm1.value.email)
      .pipe(first())
      .subscribe(
        _data => {
          alert('email envoyé');
          let ref = document.getElementById('cancel');
          this.emailForm.reset();
        },
        _error => {
          alert('adresse email incorrect');
          this.emailForm.reset();

        }
      )
  }

}
