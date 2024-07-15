import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth.service';
import { CollaborateurService } from 'src/app/collaborateur.service';

@Component({
  selector: 'app-dashbord-power-bi',
  templateUrl: './dashbord-power-bi.component.html',
  styleUrls: ['./dashbord-power-bi.component.css']
})
export class DashbordPowerBiComponent  implements OnInit{
  dashboardUrl: string = 'https://app.powerbi.com/reportEmbed?reportId=be7c8453-83bd-4def-aa1a-f6f099c2dde2&autoAuth=true&ctid=ca609612-2669-4884-a6bb-941f48aa5153'; 
  constructor(private _collabservice: CollaborateurService,private translate: TranslateService,private auth:AuthService) {
    this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');
  }
  public fullName: string = "";
  public role: string = "";
  ngOnInit() {
    this.auth.getFullNameFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
 
    this.auth.getRoleFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getRoleFromToken();
      this.role = val || fullNameFromToken
    });
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  
  logout() {
    this._collabservice.signOut();
  }
}
