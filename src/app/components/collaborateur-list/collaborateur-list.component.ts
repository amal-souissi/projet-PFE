import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ICollaborateur } from 'src/Model/Collaborateur';
import { AuthService } from 'src/app/auth.service';
import { CollaborateurService } from 'src/app/collaborateur.service';
import Swal from 'sweetalert2';
import { CollaborateurSessionComponent } from '../collaborateur-session/collaborateur-session.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.css']
})
export class CollaborateurListComponent implements OnInit{
  collabList: ICollaborateur[] = [];
  displayedColumns: string[] = ['collab_Name', 'collab_Analytical_Code','collab_Tunis_Num','collab_Recrutement_Date','collab_Birth_Date','collab_Sex',
  'collab_university','collab_Diplome','collab_years_experience','collab_Departement','collab_Equipe','collab_Poste','collab_type_Contrat',
  'collab_Manager','collab_teamLead','actions'];
  constructor(private _collabservice: CollaborateurService, private router: Router ,private auth:AuthService,private dialog:MatDialog,private translate: TranslateService) {
    this._collabservice.getALLcollabrateur().subscribe((result) => {
      this.collabList = result;
      console.log(this.collabList);
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
    this.getCollabFromServer();
    
    this.auth.getFullNameFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
 
    this.auth.getRoleFromStore().subscribe(val=>{
      let fullNameFromToken = this.auth.getRoleFromToken();
      this.role = val || fullNameFromToken
    });

  }


openSessionDialog(collabId: number): void {
  const dialogRef = this.dialog.open(CollaborateurSessionComponent, {
    width: '500px',
    data: { collabId: collabId }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Actualisez les données si nécessaire
      this.getCollabFromServer();
    }
  });
}


  logout() {
    this._collabservice.signOut();
  }

  getCollabFromServer() {
    this._collabservice.getALLcollabrateur().subscribe((result) => {
      this.collabList = result;
      console.log(this.collabList);

    });
  }

  edit(collabId: number) {
    console.log(collabId);
    this.router.navigateByUrl('/collaborateur/' + collabId);
  }

  GetuserByID(collabId: any) {
    this.router.navigateByUrl("/collaborateur/" + collabId);
    this._collabservice.getcollabrateur(collabId).subscribe(res => {

      console.log("user detail", res);
    });
  }

  Supprimer(collabId: any, data: any) {
    this._collabservice.updateStatuscollabrateur(collabId, data).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "DELETE...",
        text: "You clicked the button!",
      })
      console.log(" supprimer");
      this.getCollabFromServer();
    });
  }

 
}
  



