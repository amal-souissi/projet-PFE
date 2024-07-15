import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CollaborateurListComponent } from './components/collaborateur-list/collaborateur-list.component';
import { MatTableModule } from '@angular/material/table';
import { CollaborateurFormComponent } from './components/collaborateur-form/collaborateur-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollaborateurSuppimerComponent } from './components/collaborateur-suppimer/collaborateur-suppimer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormationListComponent } from './components/formation-list/formation-list.component';
import { FormationFormComponent } from './components/formation-form/formation-form.component';
import { FilterPipe } from './filter.pipe';
import { SessionformationFormComponent } from './components/sessionformation-form/sessionformation-form.component';
import { SessionformationListComponent } from './components/sessionformation-list/sessionformation-list.component';
import { SessionformationDetailsComponent } from './components/sessionformation-details/sessionformation-details.component';
// import { PowerBIEmbedModule } from 'powerbi-client-angular';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { CollaborateurSessionComponent } from './components/collaborateur-session/collaborateur-session.component';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashbordPowerBiComponent } from './components/dashbord-power-bi/dashbord-power-bi.component';
// Fonction de fabrique pour TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
 }
@NgModule({
  declarations: [
    AppComponent,
    CollaborateurListComponent,
    CollaborateurFormComponent,
    CollaborateurSuppimerComponent,
    LoginComponent,
    SignupComponent,
    FormationListComponent,
    FormationFormComponent,
    FilterPipe,
    SessionformationFormComponent,
    SessionformationListComponent,
    SessionformationDetailsComponent,
    CollaborateurSessionComponent,
    DashbordPowerBiComponent,
  
    
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    MatTableModule,
    RouterLink,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    FormsModule,
    NgxPaginationModule,
    MatMenuModule,MatGridListModule,MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

  export function httpTranslateLoader(http:HttpClient) {
    return new TranslateHttpLoader(http)
    
  }

