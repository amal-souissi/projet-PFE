import { DatePipe } from "@angular/common";


export interface ICollaborateur {
    collabId: number;
    collab_Name: string,
    collab_Analytical_Code: String,
    collab_Tunis_Num: number,
    collab_Recrutement_Date: Date ,
    collab_Birth_Date: DatePipe,
    collab_Sex: string,
    collab_university: string,
    collab_Diplome: string,
    collab_years_experience: number,
    collab_Departement: string,
    collab_Equipe: string,
    collab_Poste: string,
    collab_type_Contrat: string,
    collab_Manager: string,
    collab_teamLead: string,
    collab_status:number,
}