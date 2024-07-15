import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISessionFormation } from 'src/Model/SessionFormation';
import { CollaborateurService } from 'src/app/collaborateur.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';

@Component({
  selector: 'app-collaborateur-session',
  templateUrl: './collaborateur-session.component.html',
  styleUrls: ['./collaborateur-session.component.css']
})
export class CollaborateurSessionComponent implements OnInit {
sessions: ISessionFormation[] = [];
 selectedSessions: ISessionFormation[] = [];
 collabId: number;
 noAvailableSessions: boolean = false;
 constructor(
   public dialogRef: MatDialogRef<CollaborateurSessionComponent>,
   @Inject(MAT_DIALOG_DATA) public data: { collabId: number },
   private _collabservice: CollaborateurService,
   private translate: TranslateService,
   private router: Router
 ) {
   this.collabId = data.collabId;
   this.translate.setDefaultLang('fr');
   this.translate.setDefaultLang('en'); }
 switchLanguage(language: string) {
   this.translate.use(language);
 }
 ngOnInit() {
   this.loadSessions();
   console.log(this.data.collabId);
 }
 loadSessions() {
   this._collabservice.getCollaborateurSessions(this.collabId).subscribe(sessions => {
     this.selectedSessions = sessions;
     this._collabservice.GetFutureSessionFormations().subscribe(allSessions => {
       this.sessions = allSessions.filter(session => !this.selectedSessions.some(selected => selected.session_Id === session.session_Id));
       this.noAvailableSessions = this.sessions.length === 0;
     });
   });
 }
 addToSelected(session: ISessionFormation): void {
   if (this.selectedSessions.length >= 3) {
     Swal.fire({
       icon: "warning",
       title: "Vous devez sélectionner seulement 3 sessions !",
       text: "Vous allez être redirigé vers la liste des collaborateurs."
     }).then((result) => {
       if (result.isConfirmed || result.isDismissed) {
         this.router.navigateByUrl("/collaborateur-list");
       }
     });
     console.log('Erreur : plus de 3 sessions sélectionnées.');
     return;
   }
   const sessionExists = this.selectedSessions.some(s => s.session_Id === session.session_Id);
   if (sessionExists) {
     Swal.fire({
       icon: "error",
       title: "Cette session est déjà sélectionnée !",
       text: "Veuillez choisir une session différente."
     });
     console.log('Erreur : session déjà sélectionnée.');
     return;
   }
   this.selectedSessions.push(session);
   this.sessions = this.sessions.filter(s => s.session_Id !== session.session_Id);
 }
 removeFromSelected(session: ISessionFormation): void {
   this.selectedSessions = this.selectedSessions.filter(s => s.session_Id !== session.session_Id);
   this.sessions.push(session);
   this._collabservice.retirerSessionsDesCollaborateurs([session.session_Id], [this.collabId]).subscribe(() => {
     Swal.fire({
       icon: "success",
       title: "Session retirée avec succès",
       text: "La session a été retirée des sessions sélectionnées."
     });
     console.log('Session retirée avec succès.');
   }, error => {
     console.error('Erreur lors du retrait de la session:', error);
     Swal.fire({
      icon: "success",
      title: "Session retirée avec succès",
       text: "Session retirée avec succès."
     });
   });
   this.router.navigateByUrl("/collaborateur-list");

 }
 onNoClick(): void {
   this.dialogRef.close();
 }
 onSubmit(): void {
   if (this.selectedSessions.length > 3) {
     Swal.fire({
       icon: "warning",
       title: "Vous devez sélectionner seulement 3 sessions !",
       text: "Vous allez être redirigé vers la liste des collaborateurs."
     }).then((result) => {
       if (result.isConfirmed || result.isDismissed) {
         this.router.navigateByUrl("/collaborateur-list");
       }
     });
     console.log('Erreur : plus de 3 sessions sélectionnées.');
     return;
   } else {
     const sessionIds = this.selectedSessions.map(session => session.session_Id);
     this._collabservice.affecterSessions(this.collabId, sessionIds).subscribe(() => {
       this.dialogRef.close(true);
       this.router.navigateByUrl("/collaborateur-list");
     });
     Swal.fire({
       icon: "success",
       title: "Sessions affectées avec succès !"
     });
   }
 }
}