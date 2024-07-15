import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ICollaborateur } from 'src/Model/Collaborateur';
import { CollaborateurService } from 'src/app/collaborateur.service';
declare var pdfMake: any;
@Component({
  selector: 'app-sessionformation-details',
  templateUrl: './sessionformation-details.component.html',
  styleUrls: ['./sessionformation-details.component.css']
})
export class SessionformationDetailsComponent implements OnInit {
  collaborateurs: ICollaborateur[] = [];
  constructor(
    public dialogRef: MatDialogRef<SessionformationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { session: any, formation: any, collaborateurs: ICollaborateur[] },
    private dialog: MatDialog,
    private _collabservice: CollaborateurService,private translate: TranslateService
  ) {     this.translate.setDefaultLang('fr');
    this.translate.setDefaultLang('en');}
  ngOnInit() {
    this.collaborateurs = this.data.collaborateurs;
  }
  printDetails(): void {
    // Implémentation de l'impression des détails
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  
 }
 