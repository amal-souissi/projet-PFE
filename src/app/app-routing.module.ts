import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaborateurListComponent } from './components/collaborateur-list/collaborateur-list.component';
import { CollaborateurFormComponent } from './components/collaborateur-form/collaborateur-form.component';
import { CollaborateurSuppimerComponent } from './components/collaborateur-suppimer/collaborateur-suppimer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { FormationListComponent } from './components/formation-list/formation-list.component';
import { FormationFormComponent } from './components/formation-form/formation-form.component';
import { SessionformationListComponent } from './components/sessionformation-list/sessionformation-list.component';
import { SessionformationFormComponent } from './components/sessionformation-form/sessionformation-form.component';
import { DashbordPowerBiComponent } from './components/dashbord-power-bi/dashbord-power-bi.component';

const routes: Routes = [
  {path:'',  redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:'dashbord',component:DashbordPowerBiComponent,canActivate:[AuthGuard]},
    
  {path:"collaborateur-list",component:CollaborateurListComponent,canActivate:[AuthGuard]},
  {path:"list",component:CollaborateurListComponent},

  {path:"collaborateur-form",component:CollaborateurFormComponent},
  {path:"collaborateur/:id",component:CollaborateurFormComponent},
  {path:"collaborateur-archiver",component:CollaborateurSuppimerComponent},


  {path:"formation-list",component:FormationListComponent,canActivate:[AuthGuard]},
  {path:"formation-form",component:FormationFormComponent},
  {path:"formation/:form_Id",component:FormationFormComponent},


  
  {path:"sessionformation-list",component:SessionformationListComponent,canActivate:[AuthGuard]},
  {path:"sessionformation-form",component:SessionformationFormComponent},
  {path:"sessionformation/:session_Id",component:SessionformationFormComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
