import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { RecruteurComponent } from './components/recruteur/recruteur.component';
import { OffresComponent } from './components/offres/offres.component';
import { CandidaturesComponent } from './components/candidatures/candidatures.component';
import { ProfilComponent } from './components/profil/profil.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MesOffresComponent } from './components/mes-offres/mes-offres.component';
import { NewPassComponent } from './components/new-pass/new-pass.component';
import { VerifCodeComponent } from './components/verif-code/verif-code.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, AccordionModule, RatingModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SafePipe } from './pipes/SafePipe';
import { FilterNomCandidatPipe } from './pipes/candidat/filter-nom-candidat.pipe';
import { FilterPrenomCandidatPipe } from './pipes/candidat/filter-prenom-candidat.pipe';
import { FilterTitreCandidatPipe } from './pipes/candidat/filter-titre-candidat.pipe';
import { FilterDiplomeCandidatPipe } from './pipes/candidat/filter-diplome-candidat.pipe';
import { FilterAdresseCandidatPipe } from './pipes/candidat/filter-adresse-candidat.pipe';
import { FilterDatenaissanceCandidatPipe } from './pipes/candidat/filter-datenaissance-candidat.pipe';
import { FilterEmailCandidatPipe } from './pipes/candidat/filter-email-candidat.pipe';
import { FilterTelCandidatPipe } from './pipes/candidat/filter-tel-candidat.pipe';
import { FilterNationaliteCandidatPipe } from './pipes/candidat/filter-nationalite-candidat.pipe';
import { FilterAjoutCandidatPipe } from './pipes/candidat/filter-ajout-candidat.pipe';
import { FilterModifCandidatPipe } from './pipes/candidat/filter-modif-candidat.pipe';
import { FilterPresentationEmployeurPipe } from './pipes/employeur/filter-presentation-employeur.pipe';
import { FilterSiteEmployeurPipe } from './pipes/employeur/filter-site-employeur.pipe';
import { FilterTailleEmployeurPipe } from './pipes/employeur/filter-taille-employeur.pipe';
import { FilterAdresseEmployeurPipe } from './pipes/employeur/filter-adresse-employeur.pipe';
import { FilterTypeEmployeurPipe } from './pipes/employeur/filter-type-employeur.pipe';
import { FilterFondationEmployeurPipe } from './pipes/employeur/filter-fondation-employeur.pipe';
import { FilterEmailEmployeurPipe } from './pipes/employeur/filter-email-employeur.pipe';
import { FilterPaysEmployeurPipe } from './pipes/employeur/filter-pays-employeur.pipe';
import { FilterAjoutEmployeurPipe } from './pipes/employeur/filter-ajout-employeur.pipe';
import { FilterModificationEmployeurPipe } from './pipes/employeur/filter-modification-employeur.pipe';
import { FilterIntituleCategoriePipe } from './pipes/categorie/filter-intitule-categorie.pipe';
import { FilterAjoutCategoriePipe } from './pipes/categorie/filter-ajout-categorie.pipe';
import { FilterModifCategoriePipe } from './pipes/categorie/filter-modif-categorie.pipe';
import { FilterNomEmployeurPipe } from './pipes/employeur/filter-nom-employeur.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HeaderComponent,
    NavComponent,
    BodyComponent,
    LoginComponent,
    InscriptionComponent,
    CandidatsComponent,
    RecruteurComponent,
    OffresComponent,
    CandidaturesComponent,
    ProfilComponent,
    CategoriesComponent,
    MesOffresComponent,
    NewPassComponent,
    VerifCodeComponent,
    FilterNomCandidatPipe,
    FilterPrenomCandidatPipe,
    FilterTitreCandidatPipe,
    FilterDiplomeCandidatPipe,
    FilterAdresseCandidatPipe,
    FilterDatenaissanceCandidatPipe,
    FilterEmailCandidatPipe,
    FilterTelCandidatPipe,
    FilterNationaliteCandidatPipe,
    FilterAjoutCandidatPipe,
    FilterModifCandidatPipe,
    FilterNomEmployeurPipe,
    FilterPresentationEmployeurPipe,
    FilterSiteEmployeurPipe,
    FilterTailleEmployeurPipe,
    FilterAdresseEmployeurPipe,
    FilterTypeEmployeurPipe,
    FilterFondationEmployeurPipe,
    FilterEmailEmployeurPipe,
    FilterPaysEmployeurPipe,
    FilterAjoutEmployeurPipe,
    FilterModificationEmployeurPipe,
    FilterIntituleCategoriePipe,
    FilterAjoutCategoriePipe,
    FilterModifCategoriePipe,
   // HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    NgxSpinnerModule,
    RatingModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      progressAnimation:'increasing',
      preventDuplicates: true
    }),
    ModalModule.forRoot(),
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
