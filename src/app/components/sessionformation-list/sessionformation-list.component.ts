import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IFormation } from 'src/Model/Formation';
import { ISessionFormation } from 'src/Model/SessionFormation';
import { AuthService } from 'src/app/auth.service';
import { CollaborateurService } from 'src/app/collaborateur.service';
import Swal from 'sweetalert2';
import { SessionformationDetailsComponent } from '../sessionformation-details/sessionformation-details.component';
import { ICollaborateur } from 'src/Model/Collaborateur';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sessionformation-list',
  templateUrl: './sessionformation-list.component.html',
  styleUrls: ['./sessionformation-list.component.css']
})
export class SessionformationListComponent implements OnInit{
  SFList: ISessionFormation[] = [];
  displayedColumns: string[] = ['session_nom', 'dateSession','formatSession','themeSession','organisme','formationID','actions'];
  constructor(private _collabservice: CollaborateurService, private router: Router ,private auth:AuthService ,private dialog:MatDialog,private translate: TranslateService) {
    this._collabservice.getALLSessionFormations().subscribe((result) => {
      this.SFList = result;
      console.log(this.SFList);
    });
    this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');

  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getTrainingName(formationID:any){
    const formation =this.FormationList.find(form=>form.form_Id===formationID);
    return formation ? formation.fom_nom:'unknowen';

  }





  searchText:any;
  public fullName: string = "";
  public role: string = "";
  FormationList : IFormation[]=[];
  ngOnInit() {
    this.getSFFromServer();
    
    this.auth.getFullNameFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
 
    this.auth.getRoleFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getRoleFromToken();
      this.role = val || fullNameFromToken
    });

    this._collabservice.getALLFormations().subscribe(res =>{
      this.FormationList = res as [];
    });


    this._collabservice.getALLFormations().subscribe(res =>{
      this.FormationList = res ;
    });



 

  }
  showDetails(element: any): void {
    this._collabservice.getFormationDetails(element.formationID).subscribe(formation => {
      const dialogRef = this.dialog.open(SessionformationDetailsComponent, {
        data: { session: element, formation: formation, collaborateurs: element }
      });
    });
   }

  logout() {
    this._collabservice.signOut();
  }


  getSFFromServer() {
    this._collabservice.getALLSessionFormations().subscribe((result) => {
      this.SFList = result;
      
      console.log(this.SFList);

    });
  }

  edit(session_Id: number) {
    console.log(session_Id);
    this.router.navigateByUrl('/sessionformation/' + session_Id);
  }

  GetuserByID(session_Id: any) {
    this.router.navigateByUrl("/sessionformation/" + session_Id);
    this._collabservice.getSessionFormations(session_Id).subscribe(res => {

      console.log("user detail", res);
    });
  }

  Supprimer(session_Id: any) {
    this._collabservice.deleteSessionFormations(session_Id).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "DELETE...",
        text: "You clicked the button!",
      })
      console.log("collaborateur supprimer");
      this.getSFFromServer();
    });
  }

 
}
  



