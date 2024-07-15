import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IFormation } from 'src/Model/Formation';
import { AuthService } from 'src/app/auth.service';
import { CollaborateurService } from 'src/app/collaborateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})


 
export class FormationListComponent implements OnInit{
  FormationList: IFormation[] = [];
  displayedColumns: string[] = ['fom_nom', 'from_descrip','from_duree','from_axe','from_theme','from_certif', 'from_prestataire','actions'];
  constructor(private _collabservice: CollaborateurService, private router: Router ,private auth:AuthService,private translate: TranslateService ) {
    this.translate.setDefaultLang('fr');
    this._collabservice.getALLFormations().subscribe((result) => {
      this.FormationList = result;
      console.log(this.FormationList);


    });

    this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }


  searchText:any;
  public fullName: string = "";
  public role: string = "";
  ngOnInit() {
    this.getFormationFromServer();
    
    this.auth.getFullNameFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
 
    this.auth.getRoleFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getRoleFromToken();
      this.role = val || fullNameFromToken
    });

  }


  logout() {
    this._collabservice.signOut();
  }


  getFormationFromServer() {
    this._collabservice.getALLFormations().subscribe((result) => {
      this.FormationList = result;
      console.log(this.FormationList);

    });
  }

  edit(form_Id:any) {
    console.log(form_Id);
    this.router.navigateByUrl('/formation/' + form_Id);
  }

  GetuserByID(form_Id: any) {
    this.router.navigateByUrl("/formation/" + form_Id);
    this._collabservice.getFormations(form_Id).subscribe(res => {
      console.log("user detail", res);
    });
  }

  Supprimer(form_Id: any) {
    this._collabservice.deleteFormations(form_Id).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "DELETE...",
        text: "You clicked the button!",
      })
      console.log(" supprimer");
      this.getFormationFromServer();
    });
  }























}
  



