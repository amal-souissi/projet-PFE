import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICollaborateur } from 'src/Model/Collaborateur';
import { IFormation } from 'src/Model/Formation';
import { ISessionCollab } from 'src/Model/SessionCollab';
import { ISessionFormation } from 'src/Model/SessionFormation';


@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
 apiurl = "https://localhost:7210";
  constructor(private _http:HttpClient, private route:Router)
  {
    // this.userPaylod = this.decodedToken();

  }

//api pour recuperer les collaborateurs 
  getALLcollabrateur(){
    return this._http.get<ICollaborateur[]>(this.apiurl+"/api/RH_Collaborateur");
  }
  getALLcollabrateurStatus(){
    return this._http.get<ICollaborateur[]>(this.apiurl+"/api/RH_Collaborateur/status");
  }
  
  createCollaborateur(data:ICollaborateur){
    return this._http.post(this.apiurl+'/api/RH_Collaborateur',data);
  }
  
  getcollabrateur(Id:number){
    return this._http.get<ICollaborateur>(this.apiurl+"/api/RH_Collaborateur/"+Id);
  }

  updatecollabrateur(Id:any,data: ICollaborateur){
    return this._http.put<ICollaborateur>(this.apiurl+"/api/RH_Collaborateur/"+Id,data);
  }

  deletecollabrateur(Id:number){
    return this._http.delete(this.apiurl+"/api/RH_Collaborateur/"+Id);
  }


  updateStatuscollabrateur(Id:number,data: ICollaborateur){
    return this._http.put<ICollaborateur>(this.apiurl+"/api/RH_Collaborateur/updateStatus/"+Id,data);
  }
  updateStatusAcollabrateur(Id:number,data: ICollaborateur){
    return this._http.put<ICollaborateur>(this.apiurl+"/api/RH_Collaborateur/updateStatusA/"+Id,data);
  }

////ajouter session a collab 
affecterSessions(collabId: number, sessionIds: number[]): Observable<any> {
  const body = { collabIds: [collabId], sessionIds: sessionIds };
  return this._http.post<any>(this.apiurl+"/api/SessionsFormations/affecter-sessions", body);
}

getSessionFormationsCollab(){
  return this._http.get<ISessionCollab[]>(this.apiurl+"/api/RH_Collaborateur");
}
getCollaborateurSessions(collabId: number): Observable<ISessionFormation[]> {
  return this._http.get<ISessionFormation[]>(this.apiurl+"/api/RH_Collaborateur/SessionFormation/"+collabId);
}


retirerSessionsDesCollaborateurs(sessionIds: number[], collabIds: number[]): Observable<any> {
  const body = { sessionIds, collabIds };
  return this._http.put(this.apiurl+"/api/SessionsFormations/retirer-sessions",body);
}


  // //api pour recupere les formations 
  getALLFormations(){
    return this._http.get<IFormation[]>(this.apiurl+"/api/RH_Formations");
  }
  

  createFormations(data: IFormation){
    return this._http.post(this.apiurl+'/api/RH_Formations',data);
  }

  getFormations(form_Id:number){
    return this._http.get<IFormation>(this.apiurl+"/api/RH_Formations/"+form_Id);
  }

  updateFormations(form_Id:any,data:IFormation){
    return this._http.put<IFormation>(this.apiurl+"/api/RH_Formations/"+form_Id,data);
  }

  deleteFormations(form_Id:any){
    return this._http.delete(this.apiurl+"/api/RH_Formations/"+form_Id);
  }


 
  // //api pour recupere les Session formations 
  getALLSessionFormations(){
    return this._http.get<ISessionFormation[]>(this.apiurl+"/api/SessionsFormations");
  }

 // //api pour recupere les Session formations 
 GetFutureSessionFormations(){
  return this._http.get<ISessionFormation[]>(this.apiurl+"/api/SessionsFormations/futures");
}
  createSessionFormations(data:ISessionFormation){
    return this._http.post(this.apiurl+'/api/SessionsFormations',data);
  }

  getSessionFormations(session_Id:any){
    return this._http.get<ISessionFormation>(this.apiurl+"/api/SessionsFormations/"+session_Id);
  }

  updateSessionFormations(session_Id:any,data:ISessionFormation){
    return this._http.put<ISessionFormation>(this.apiurl+"/api/SessionsFormations/"+session_Id,data);
  }

  deleteSessionFormations(session_Id:any){
    return this._http.delete(this.apiurl+"/api/SessionsFormations/"+session_Id);
  }


getFormationList(){
  return this._http.get(this.apiurl+'/api/SessionsFormations');
}



getFormationDetails(form_Id: any): Observable<IFormation> {
  return this._http.get<IFormation>(this.apiurl+"/api/RH_Formations/"+form_Id); // Remplacez '/api/formations/' par l'URL réelle de votre backend
}



//   /api/RH_Users/register
//   /api/RH_Users/authenticate

signUp(userObj:any){
return this._http.post<any>(this.apiurl+'/api/RH_Users/register',userObj);
}

login(loginObj:any){
  return this._http.post<any>(this.apiurl+"/api/RH_Users/authenticate",loginObj);

}

storeToken(tokenvalue: string ){
  localStorage.setItem('token',tokenvalue)
}

getToken(){
  return localStorage.getItem('token')
}

isLoggedIn(): boolean{
  return !!localStorage.getItem('token')
}

signOut(){
localStorage.clear();
this.route.navigate(["login"])}


getUsers(){
  return this._http.get<any>(this.apiurl+"/api/RH_Users");
}


//slect

getDropdownText(id: any, obj: any[]): any[] {
  return obj.filter(o => id.includes(o.id));
}
}
