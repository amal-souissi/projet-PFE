import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICollaborateur } from 'src/Model/Collaborateur';
import { IFormation } from 'src/Model/Formation';
import { ISessionFormation } from 'src/Model/SessionFormation';
import { CollaborateurService } from 'src/app/collaborateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sessionformation-form',
  templateUrl: './sessionformation-form.component.html',
  styleUrls: ['./sessionformation-form.component.css']
})
export class SessionformationFormComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private formBuilder:FormBuilder, private service:CollaborateurService ,private translate: TranslateService){
    this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');}
    
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  SFform!: FormGroup;
  Sform!: FormGroup;
  session_Id!: any;
  isEdit: boolean = false;
  FormationList: IFormation[] = [];
  collabList: ICollaborateur[] = [];
  initForm(): void {
    this.SFform = this.formBuilder.group({
      session_Id: [0, [Validators.required]],
      session_nom: ['', [Validators.required]],
      dateSession: ['', [Validators.required]],
      formatSession: ['', [Validators.required]],
      themeSession: ['', [Validators.required]],
      organisme: ['', [Validators.required]],
      formationID: ['', [Validators.required]],
      Session_Id:[0],
    });
  }


  ngOnInit() {
    this.initForm();
    this.session_Id = this.route.snapshot.paramMap.get('session_Id');
    if (this.session_Id) {
      this.isEdit = true;
      this.service.getSessionFormations(this.session_Id).subscribe(i => {
        this.SFform.patchValue(i);
      });
    }
    this.service.getALLFormations().subscribe(res => {
      this.FormationList = res;
    });
    this.service.getALLcollabrateur().subscribe(collabs => {
      this.collabList = collabs;
    });
  }
  logout() {
    this.service.signOut();
  }
  save() {
    if (this.SFform.invalid) {
      Swal.fire({
        title: "Invalid form!",
        text: "Please check the form fields.",
        icon: "error"
      });
      return;
    }
    const formData = this.SFform.value;
    console.log('Form data:', formData); // Log the form data for debugging
    if (this.isEdit) {
      this.service.updateSessionFormations(this.session_Id, formData).subscribe({
        next: () => {
          console.log('success');
          this.router.navigateByUrl("/sessionformation-list");
          Swal.fire({
            title: "Edit successful!",
            text: "You clicked the button!",
            icon: "success"
          });
        },
        error: (err) => {
          console.error('Error updating session formation:', err); // Log the error for debugging
          Swal.fire({
            title: "Error!",
            text: "Failed to update session formation.",
            icon: "error"
          });
        }
      });
    } else {
      this.service.createSessionFormations(formData).subscribe({
        next: () => {
          console.log("success");
          this.router.navigateByUrl("/sessionformation-list");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Session training added successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Error creating session formation:', err); // Log the error for debugging
          Swal.fire({
            title: "Error!",
            text: "Failed to create session formation.",
            icon: "error"
          });
        }
      });
    }
  }}
 