import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { CollaborateurService } from '../collaborateur.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:CollaborateurService , private router:Router){}


  canActivate():boolean{

    if(this.service.isLoggedIn()){
      return true;
    }else{
      Swal.fire({
        icon: "warning",
        title: " Please Login First  !...",
        text: "Please Login First  !!",
      });
      this.router.navigate(['login'])
      return false ;
    }
  }
  
}
