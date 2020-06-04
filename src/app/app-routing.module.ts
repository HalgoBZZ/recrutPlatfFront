import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { BodyComponent } from './components/body/body.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { RecruteurComponent } from './components/recruteur/recruteur.component';
import { OffresComponent } from './components/offres/offres.component';
import { CandidaturesComponent } from './components/candidatures/candidatures.component';
import { MesOffresComponent } from './components/mes-offres/mes-offres.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NewPassComponent } from './components/new-pass/new-pass.component';
import { VerifCodeComponent } from './components/verif-code/verif-code.component';
import { LanguesComponent } from './components/langues/langues.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { MesCompetencesComponent } from './components/mes-competences/mes-competences.component';
import { MesFormationsComponent } from './components/mes-formations/mes-formations.component';
import { MesLanguesComponent } from './components/mes-langues/mes-langues.component';
import { MesExperiencesComponent } from './components/mes-experiences/mes-experiences.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'new-pass', component: NewPassComponent },
  { path: 'verification', component: VerifCodeComponent },
  {
    path: 'principal', component: BodyComponent, children: [
      { path: 'categories', component: CategoriesComponent, outlet: 'child1' },
      { path: 'candidats', component: CandidatsComponent, outlet: 'child1' },
      { path: 'employeurs', component: RecruteurComponent, outlet: 'child1' },
      { path: 'offres', component: OffresComponent, outlet: 'child1' },
      { path: 'candidatures', component: CandidaturesComponent, outlet: 'child1' },
      { path: 'mes-offres', component: MesOffresComponent, outlet: 'child1' },
      { path: 'profil', component: ProfilComponent, outlet: 'child1' },
      { path: 'langues', component: LanguesComponent, outlet: 'child1' },
      { path: 'competences', component: CompetencesComponent, outlet: 'child1' },
      { path: 'mes-competences', component: MesCompetencesComponent, outlet: 'child1' },
      { path: 'mes-formations', component: MesFormationsComponent, outlet: 'child1' },
      { path: 'mes-langues', component: MesLanguesComponent, outlet: 'child1' },
      { path: 'mes-experiences', component: MesExperiencesComponent, outlet: 'child1' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
export class AppRoutingModule { }
