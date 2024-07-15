import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CollaborateurService } from 'src/app/collaborateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborateur-form',
  templateUrl: './collaborateur-form.component.html',
  styleUrls: ['./collaborateur-form.component.css']
})
export class CollaborateurFormComponent implements OnInit {
  sexList = ['femme', 'homme'];
  typecontratList = ['CDI', 'CDD', 'Stagiaires'];
  Collabform!: FormGroup;
  collabId!: any;
  isEdit: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: CollaborateurService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');

  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  initForm(): void {
    this.Collabform = this.formBuilder.group({
      collab_Name: ['', [Validators.required]],
      collab_Analytical_Code: ['', [Validators.required]],
      collab_Tunis_Num: ['', [Validators.required]],
      collab_Recrutement_Date: ['', [Validators.required]],
      collab_Birth_Date: ['', [Validators.required]],
      collab_Sex: ['', [Validators.required]],
      collab_university: ['', [Validators.required]],
      collab_Diplome: ['', [Validators.required]],
      collab_years_experience: [0, [Validators.required]],
      collab_Departement: ['', [Validators.required]],
      collab_Equipe: ['', [Validators.required]],
      collab_Poste: ['', [Validators.required]],
      collab_type_Contrat: ['', [Validators.required]],
      collab_Manager: ['', [Validators.required]],
      collab_teamLead: ['', [Validators.required]],
      collab_status: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.initForm();
    this.collabId = this.route.snapshot.paramMap.get('id');
    if (this.collabId) {
      this.isEdit = true;
      this.service.getcollabrateur(this.collabId).subscribe(employer => {
        this.Collabform.patchValue(employer);
      });
    }
  }
  logout() {
    this.service.signOut();
  }


  save() {
    console.log(this.Collabform.value);
if(this.isEdit){
  this.service.updatecollabrateur(this.collabId,this.Collabform.value).subscribe(()=>{
    console.log('sucess');
    this.router.navigateByUrl("/collaborateur-list");
    Swal.fire({
      title: "Edit successful!",
      text: "You clicked the button!",
      icon: "success"
    })

  })

} 

else{
  this.service.createCollaborateur(this.Collabform.value).subscribe(()=>{
    console.log("sucess");
    this.router.navigateByUrl("/collaborateur-list");
    Swal.fire({
      position: "top-end",
      title: this.translate.instant('EMPLOYEE_ADDED_SUCCESSFULLY'),
      text: this.translate.instant('YOU_CLICKED_THE_BUTTON'),
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
  })
}
}
}