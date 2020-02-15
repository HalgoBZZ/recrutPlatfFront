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
import { OffreSalairePipePipe } from './pipes/offre-salaire-pipe.pipe';
import { OffreExperiencePipePipe } from './pipes/offre-experience-pipe.pipe';
import { OffreDomainePipePipe } from './pipes/offre-domaine-pipe.pipe';
import { OffreLanguePipePipe } from './pipes/offre-langue-pipe.pipe';
import { OffreCompetencePipePipe } from './pipes/offre-competence-pipe.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
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
    OffreSalairePipePipe,
    OffreExperiencePipePipe,
    OffreDomainePipePipe,
    OffreLanguePipePipe,
    OffreCompetencePipePipe,
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
    RatingModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
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
