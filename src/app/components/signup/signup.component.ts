import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import ValidateForm from 'src/app/Helpers/ValidateForm';
import { CollaborateurService } from 'src/app/collaborateur.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: CollaborateurService, private router:Router, private translate: TranslateService ) {      this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');}
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      Firstname: [, Validators.required],
      LastName: [, Validators.required],
      Email: [, Validators.required],
      UserName: [, Validators.required],
      password: [, Validators.required],
    })
  }

  onSignup() {
    if (this.signUpForm.valid) {
      this.service.signUp(this.signUpForm.value)
        .subscribe({
          next: (res=>{
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
          })
          ,error: (err=>{
            alert(err?.error.message)
          })
        })
    

    }
    else {
      ValidateForm.validateAllFormFields(this.signUpForm)
      alert("Your form not valid")

    }
  }
}
