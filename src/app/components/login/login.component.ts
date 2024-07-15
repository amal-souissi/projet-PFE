import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/ValidateForm';
import { AuthService } from 'src/app/auth.service';
import { CollaborateurService } from 'src/app/collaborateur.service';
import { TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  public resetPassword!: string;
  public isvalidEmail!:boolean;
  constructor(private fb: FormBuilder ,private service:CollaborateurService, private router:Router,private auth:AuthService,private dialog: MatDialog, private translate: TranslateService ) {      this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    })
  }

  OnLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //send
      this.service.login(this.loginForm.value).subscribe({
        next:(res=>{
          console.log(res.message);
          this.loginForm.reset();
          this.service.storeToken(res.token); 
          Swal.fire({icon: "success",title: "Login Sucess !...",text: "Login Sucess !!",});
          this.router.navigateByUrl('/dashbord');


        }),
        error:(err=>{
          Swal.fire({
            icon: "warning",
            title: "Login fail !...",
            text: "Login fail !!",
          });
          console.log(err)
        })
      })
    }else{
      //throw
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form not valid")
    }
  }
 

checkvalidationemail(event:string){
  const value =event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isvalidEmail = pattern.test(value);
  return this.isvalidEmail;
}

confirmtosend(){
  if(this.checkvalidationemail(this.resetPassword)){
    console.log(this.resetPassword);
    this.resetPassword="";
    const buttonRef = document.getElementById("closeBtn");
    buttonRef?.click();


  }

}



  }




