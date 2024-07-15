import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IFormation } from 'src/Model/Formation';
import { CollaborateurService } from 'src/app/collaborateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.css']
})
export class FormationFormComponent implements OnInit {
  constructor(private router:Router, private route:ActivatedRoute, private formBuilder:FormBuilder, private service:CollaborateurService , private translate: TranslateService ){ 
        this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');}
  
  
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  themeList=['.net','PowerBi','angular','Azure devops','EntityFramework Core','Python']
  DurationList=['1 jours','2 jours','3 jours','4 jours','5 jours','6 jours' ,'1 semaines','2 semaines','3semaines']
  axisList=['Cloud','Data','Cyber-sécurité','Intelligence Artificielle','Programmation','Blockchain'];
  CertificatList=['OUI','NON'];
  FormationForm!:FormGroup;
  isEdit: boolean= false;
  form_Id!:any;  
  initForm(): void {
    this.FormationForm=this.formBuilder.group({
      form_Id: [0,[Validators.required]],
      fom_nom: ['',[Validators.required]],
      from_descrip: ['',[Validators.required]],
      from_duree: ['',[Validators.required]],
      from_axe:  ['',[Validators.required]],
      from_theme:  ['',[Validators.required]],
      from_certif: ['',[Validators.required]],
      from_prestataire:  ['',[Validators.required]],
    });
  }
  
  ngOnInit(){
  
  this.initForm();
     this.form_Id = this.route.snapshot.paramMap.get('form_Id');
     if (this.form_Id) {
       this.isEdit = true;
       this.service.getFormations(this.form_Id).subscribe(Z => {
         this.FormationForm.patchValue(Z);
       });
     }
  }
  
  
  logout() {
    this.service.signOut();
  }
    save() {
      console.log(this.FormationForm.value);
  if(this.isEdit){
    this.service.updateFormations(this.form_Id,this.FormationForm.value).subscribe(()=>{
      console.log('sucess');
      this.router.navigateByUrl("/formation-list");
      Swal.fire({
        title: "Edit successful!",
        text: "You clicked the button!",
        icon: "success"
      })
  
    })
  
  } 
  
  else{
    this.service.createFormations(this.FormationForm.value).subscribe(()=>{
      console.log("sucees");
      this.router.navigateByUrl("/formation-list");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Training added successfully!",
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  }











































  }
  