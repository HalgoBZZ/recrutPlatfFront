import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { CandidatService } from 'src/app/services/candidat.service';
import { CandidatureService } from 'src/app/services/candidature.service';
import { OffreLangueService } from 'src/app/services/offre-langue.service';
import { Domaine } from 'src/app/modals/Domaine';
import { CompetenceService } from 'src/app/services/competence.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DomaineService } from 'src/app/services/domaine.service';
import { CandidatExperienceService } from 'src/app/services/candidat-experience.service';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {
  isAllOpen = false;
  isOpen = [false, false, false];
  bsModalRef: BsModalRef;
  isReadonly = false;
  max = 5;
  rateAng = 0;
  rateFr = 0;
  fr = 4;
  addComp = false;
  salaire = 0;
  experience = 0;
  ang = 3;
  pieChart;
  chartOptions;
  candidat;
  login;
  candidatures;
  languesByOffres = [];
  dataLoaded = false;
  data;
  listFilterCompetences;
  filterObject = {
    domaine: new Domaine(),
    etude: 0,
    salaire: 0,
    experience: 0,
    competences: []
  };
  listDomaines;
  chartsData = [];

  dropdownSettingsDomaine: IDropdownSettings;
  dropdownSettings: IDropdownSettings;

  constructor(private modalService: BsModalService, private candidatureService: CandidatureService, private spinner: NgxSpinnerService,
    private candidatService: CandidatService, private langueOffreService: OffreLangueService,
    private candidatExperienceService: CandidatExperienceService,
    private competencesService: CompetenceService, private domaineService: DomaineService) {
    this.data = {
      labels: ['A', 'B'],
      datasets: [
        {
          data: [300, 100],
          backgroundColor: [
            '#32CD32',
            '#FF0000'
          ],
          hoverBackgroundColor: [
            '#32CD32',
            '#FF0000'
          ]
        }]
    };
  }

  ngOnInit() {
    this.spinner.show();
    this.getCandidature();
    this.getAllDomaines();
    this.dropdownSettingsDomaine = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  initcharts(candidat, candidatures) {
    this.candidatExperienceService.getByCandidat(candidat.id).subscribe(data => {
      const experiences: any = data;
      let nbAns = 0;
      for (const exp of experiences) {
        nbAns += this.countDuration(exp.experience.debut, exp.experience.fin);
      }
      for (const candidature of candidatures) {
        if (nbAns > candidature.offre.niveauExperience) {
          this.chartsData[candidature.offre.id] = {
            labels: ['Correspondance de votre profil', 'Non correspondance de votre profil'],
            datasets: [
              {
                data: [100, 0],
                backgroundColor: [
                  '#32CD32',
                  '#FF0000'
                ],
                hoverBackgroundColor: [
                  '#32CD32',
                  '#FF0000'
                ]
              }]
          };
        } else {
          const pourcentage = nbAns * 100 / candidature.offre.niveauExperience;
          this.chartsData[candidature.offre.id] = {
            labels: ['Correspondance de votre profil', 'Non correspondance de votre profil'],
            datasets: [
              {
                data: [pourcentage, 100 - pourcentage],
                backgroundColor: [
                  '#32CD32',
                  '#FF0000'
                ],
                hoverBackgroundColor: [
                  '#32CD32',
                  '#FF0000'
                ]
              }]
          };
        }
      }
    }, error => {
      this.spinner.hide();
      console.log('erreur lors de recuperations des experiences par candidat');
    });
  }

  private countDuration(debut, fin) {
    let diff = (new Date(fin).getTime() - new Date(debut).getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));
  }

  getAllDomaines() {
    this.domaineService.getAll().subscribe(result => {
      this.listDomaines = result;
    }, error => {
    });
  }

  getCandidature() {
    this.login = localStorage.getItem('login');
    this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
      this.candidat = cnd;
      this.candidatureService.getByCandidat(this.candidat.id).subscribe(data => {
        this.candidatures = data;
        this.initcharts(this.candidat, this.candidatures)
        for (const candidature of this.candidatures) {
          this.langueOffreService.getByOffre(candidature.offre.id).subscribe(lg => {
            this.languesByOffres[candidature.offre.id] = lg;
            console.log(this.languesByOffres);
          });
        }
        this.dataLoaded = true;
        this.spinner.hide();
      });
    }, error => {
      this.spinner.hide();
      console.log('erreur à la recupération du candidat');
    });
  }

  openOrClose(index) {
    this.isOpen[index] = !this.isOpen[index];
  }

  openAll() {
    this.isAllOpen = !this.isAllOpen;
    if (this.isAllOpen) {
      let i = 0;
      this.isOpen.forEach((element) => {
        this.isOpen[i] = true;
        i++;
      });
    } else {
      let i = 0;
      this.isOpen.forEach((element) => {
        this.isOpen[i] = false;
        i++;
      });
    }
  }


  showFilterModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }



  submitSearch(candidatures) {
    const filteredCandidatures = [];
    for (const candidature of candidatures) {
      if ((this.filterObject.etude > 0 && candidature.offre.niveauEtude <= this.filterObject.etude) ||
        (this.filterObject.experience > 0 && candidature.offre.niveauExperience <= this.filterObject.experience)
        || candidature.offre.salaire >= this.filterObject.salaire || candidature.offre.domaine.id === this.filterObject.domaine.id
        || this.containCompetence(candidature.offre.competences, this.filterObject.competences)) {
        filteredCandidatures.push(candidature);
      }
    }
    this.candidatures = filteredCandidatures;
    this.bsModalRef.hide();
  }

  onItemSelectFilterDomaines(event) {
    this.filterObject.domaine = event;
    this.getAllCompetencesByDomaine(this.filterObject.domaine);
  }

  getAllCompetencesByDomaine(item) {
    this.competencesService.getByDomaine(item.id).subscribe(result => {
      if (result != null) {
        this.listFilterCompetences = result;
      }
    }, error => {
    });
  }

  containCompetence(competences, competencesToFind) {
    for (const ctf of competencesToFind) {
      for (const c of competences) {
        if (ctf.id === c.id) {
          return true;
        }
      }
    }
  }
}
