import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import * as Highcharts from 'highcharts';
import { OffreService } from 'src/app/services/offre.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CompetenceService } from 'src/app/services/competence.service';
import { DomaineService } from 'src/app/services/domaine.service';
import { Candidat } from 'src/app/modals/Candidat';
import { CandidatService } from 'src/app/services/candidat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OffreLanguePipePipe } from 'src/app/pipes/offre-langue-pipe.pipe';
import { OffreLangueService } from 'src/app/services/offre-langue.service';
import { CandidatureService } from 'src/app/services/candidature.service';
import { Domaine } from 'src/app/modals/Domaine';
import { CandidatExperienceService } from 'src/app/services/candidat-experience.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
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
  listOffre;
  listCompetencesSearch = [];
  listCompetences;
  listFilterCompetences;
  listDomainesSearch = [];
  listDomaines;
  dropdownList = [];
  selectedItems = [];
  selectedItemsDomaines = [];
  dropdownSettings: IDropdownSettings;
  candidat;
  dropdownSettingsDomaine: IDropdownSettings;
  login;
  showPostulerBtn = [];
  languesByOffres = [];
  data;
  filterObject = {
    domaine: new Domaine(),
    etude: 0,
    salaire: 0,
    experience: 0,
    competences: []
  };

  chartsData = [];
  constructor(private modalService: BsModalService, private spinner: NgxSpinnerService, private langueOffreService: OffreLangueService,
    private competencesService: CompetenceService, private offreService: OffreService, private domaineService: DomaineService,
    private candidatService: CandidatService, private candidatureService: CandidatureService,
    private candidatExperienceService: CandidatExperienceService) {
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
    this.getAll();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsDomaine = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  initcharts(candidat, offres) {
    this.candidatExperienceService.getByCandidat(candidat.id).subscribe(data => {
      const experiences: any = data;
      let nbAns = 0;
      for (const exp of experiences) {
        nbAns += this.countDuration(exp.experience.debut, exp.experience.fin);
      }
      for (const offre of offres) {
        if (nbAns > offre.niveauExperience) {
          this.chartsData[offre.id] = {
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
          const pourcentage = nbAns * 100 / offre.niveauExperience;
          this.chartsData[offre.id] = {
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

  getAll() {
    this.showPostulerBtn = [];
    this.offreService.getAll().subscribe(result => {
      this.listOffre = result;
      this.login = localStorage.getItem('login');
      this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
        this.candidat = cnd;
        for (const offre of this.listOffre) {
          this.showPostulerButton(offre, this.candidat);
          this.langueOffreService.getByOffre(offre.id).subscribe(data => {
            this.languesByOffres[offre.id] = data;
          }, error => {
            this.spinner.hide();
            console.log('error when get langues by offres');
          });
        }
        this.initcharts(this.candidat, this.listOffre);
      }, error => {
        this.spinner.hide();
      });
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log('erreur lors de recupération des offres');
    });
  }

  annulerCandidature(offre, candidat) {
    this.spinner.show();
    this.candidatureService.deleteByCandidatAndOffre(offre.id, candidat.id).subscribe(data => {
      this.getAll();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }
  openOrClose(index) {
    console.log('before:', this.isOpen[index]);
    this.isOpen[index] = this.isOpen[index] ? false : true;
    console.log('after:', this.isOpen[index]);
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

  getAllCompetences() {
    this.competencesService.getAll().subscribe(result => {
      this.listCompetences = result;
    }, error => {
    });
  }
  getAllDomaines() {
    this.domaineService.getAll().subscribe(result => {
      this.listDomaines = result;
    }, error => {
    });
  }
  onItemSelectDomaines(item) {
    this.listDomainesSearch.push(item);
    console.log('this.listDomainesSearch', this.listDomainesSearch);
  }
  onSelectAllDomaines(items: any) {
    console.log(items);
  }
  onItemSelect(item) {
    this.listDomainesSearch.push(item);
    console.log('this.listCompetencesSearch', this.listDomainesSearch);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  postuler(offre, candidat) {
    this.spinner.show();
    const candidature = {
      offre,
      candidat
    };
    this.candidatureService.save(candidature).subscribe(result => {
      this.spinner.hide();
      this.showPostulerButton(offre, candidat);
    }, error => {
      this.spinner.hide();
    });
  }
  showPostulerButton(offre, candidat) {
    this.candidatureService.getAll().subscribe(data => {
      const candidatures: any = data;
      for (const candidature of candidatures) {
        if (candidature.offre.id === offre.id && candidature.candidat.id === candidat.id) {
          return this.showPostulerBtn[offre.id] = false;
        }
      }
    }, error => {
      return this.showPostulerBtn[offre.id] = true;
    });
  }

  submitSearch(myOffres) {
    const filteredOffres = [];
    for (const offre of myOffres) {
      if ((this.filterObject.etude > 0 && offre.niveauEtude <= this.filterObject.etude) ||
        (this.filterObject.experience > 0 && offre.niveauExperience <= this.filterObject.experience)
        || offre.salaire >= this.filterObject.salaire || offre.domaine.id === this.filterObject.domaine.id
        || this.containCompetence(offre.competences, this.filterObject.competences)) {
        filteredOffres.push(offre);
      }
    }
    this.listOffre = filteredOffres;
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
