import { Component } from '@angular/core';
import { ICollaborateur } from 'src/Model/Collaborateur';
import { CollaborateurService } from 'src/app/collaborateur.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-collaborateur-suppimer',
  templateUrl: './collaborateur-suppimer.component.html',
  styleUrls: ['./collaborateur-suppimer.component.css']
})
export class CollaborateurSuppimerComponent {
  searchText:any;
  collabList: ICollaborateur[] = [];
  displayedColumns: string[] = ['collab_Name', 'collab_Analytical_Code','collab_Tunis_Num','collab_Recrutement_Date','collab_Birth_Date','collab_Sex','collab_university',
  'collab_Diplome','collab_years_experience','collab_Departement','collab_Equipe','collab_Poste','collab_type_Contrat','collab_Manager','collab_teamLead','actions'];

    constructor(private _collabservice: CollaborateurService, private router: Router,private translate: TranslateService) {
      this._collabservice.getALLcollabrateurStatus().subscribe((result) => {
        this.collabList = result;
        console.log(this.collabList);
  
  
      });
      this.translate.setDefaultLang('fr');
      this.translate.setDefaultLang('en');    }
    switchLanguage(language: string) {
      this.translate.use(language);
    }
    ngOnInit() {
      this.getCollabFromServerr();
    }
    getCollabFromServerr() {
      this._collabservice.getALLcollabrateurStatus().subscribe((result) => {
        this.collabList = result;
        console.log(this.collabList);
  
      });
    }


    updateStatusAcollabrateur(collabId: any,data:any) {
      this._collabservice.updateStatusAcollabrateur(collabId,data).subscribe(() => {
        Swal.fire({
          icon: "success",
          title: "the employee managed to unarchive...",
          text: "unarchive employee !",
        });
        
      });
      this.getCollabFromServerr();

    }
  
    logout() {
      this._collabservice.signOut();
    }
}
