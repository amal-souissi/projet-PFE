import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CollaborateurService } from './collaborateur.service';
@Injectable({
  providedIn: 'root'
})



export class AuthService {


  private fullname$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private userPaylod: any;


  constructor(private service: CollaborateurService) {
    this.userPaylod = this.decodedToken();

  }



  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullname$.asObservable();
  }

  public setFullNameForStore(fullname: any) {
    this.fullname$.next(fullname);
  }


  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.service.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }


  getFullNameFromToken() {
    if (this.userPaylod)
      return this.userPaylod.name;
  }

  getRoleFromToken() {
    if (this.userPaylod)
      return this.userPaylod.role;
  }

}
