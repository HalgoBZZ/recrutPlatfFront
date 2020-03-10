import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OffreService } from 'src/app/services/offre.service';
import { EmployeurService } from 'src/app/services/employeur.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DomaineService } from 'src/app/services/domaine.service';
import { CompetenceService } from 'src/app/services/competence.service';
import { Offre } from 'src/app/modals/Offre';
import { Poste } from 'src/app/modals/Poste';
import { Langue } from 'src/app/modals/Langue';
import { Employeur } from 'src/app/modals/Employeur.';

@Component({
  selector: 'app-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.css']
})
export class MesOffresComponent implements OnInit {
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
  heure = 0;
  etude = 0;
  login;
  myoffres;
  listCompetencesSearch = [];
  listCompetences;
  listDomainesSearch = [];
  listDomaines;
  dropdownList = [];
  selectedItems = [];
  selectedItemsDomaines = [];
  dropdownSettings: IDropdownSettings;
  dropdownSettingsDomaine: IDropdownSettings;
  description;
  poste;
  employeurs = [];
  posteObject = new Poste();
  offre = new Offre();
  langueFrancais = new Langue();
  langueAnglais = new Langue();
  employeur = new Employeur();
  employeurConnected;
  listLangues = [];
  candidatures;
  constructor(private modalService: BsModalService, private toastr: ToastrService, private offreService: OffreService,
    private employeurService: EmployeurService, private competencesService: CompetenceService, private domaineService: DomaineService, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.getEmployeurConnected();
    this.getAllDomaines();
    this.getAllCompetences();
    this.getAll();
    this.dropdownSettingsDomaine = {
      singleSelection: true,
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
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

  }
  getEmployeurConnected() {
    this.login = localStorage.getItem('login');
    this.utilisateurService.getByLogin(this.login).subscribe(result => {
      this.employeurConnected = result;
      console.log('this.employeurConnected', this.employeurConnected);
      this.getAll();
    }, error => {
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

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showUpdateModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showInfoModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  submitSearch() { }

  addCompetence() {
    this.addComp = true;
  }

  addOffre() {
    this.langueFrancais.libelle = 'Francais';
    this.langueFrancais.niveau = this.rateFr;
    this.langueAnglais.libelle = 'Englais';
    this.langueAnglais.niveau = this.rateAng;
    this.listLangues.push(this.langueAnglais);

    this.listLangues.push(this.langueFrancais);
    this.employeurs.push(this.employeurConnected);

    this.offre.domaine = this.listDomainesSearch[0];
    this.offre.horaire = this.heure;
    this.offre.niveauEtude = this.etude;
    this.offre.langues = this.listLangues;
    this.offre.salaire = this.salaire;
    this.offre.employeur = this.employeurs;
    this.offre.niveauExperience = this.experience;
    this.offre.competences = this.listCompetencesSearch;
    this.posteObject.intitule = this.poste;
    this.posteObject.description = this.description;
    this.offre.poste = this.posteObject;
    this.offreService.saveOffre(this.offre).subscribe(result => {
      this.getAll();
    }, error => {
    });
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }


  deleteOffre() {
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }


  updateOffre() {
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }

  getAll() {
    if (this.employeurConnected) {
      this.offreService.getMyOffres(this.employeurConnected.id).subscribe(result => {
        console.log('result', result);
        this.myoffres = result;
      }, error => {
      });
    }
  }
  getCandidatures(offre) {
    this.offreService.getCandidatByOffreId(offre.id).subscribe(result => {
      console.log(' getCandidatByOffreId result', result);
      this.candidatures = result;
    }, error => {
    });
  }
  onItemSelectDomaines(item) {
    this.listDomainesSearch.push(item);
  }
  onSelectAllDomaines(items: any) {
    console.log(items);
  }
  getAllDomaines() {
    this.domaineService.getAll().subscribe(result => {
      if (result != null) {
        this.listDomaines = result;
      }
    }, error => {
    });
  }
  getAllCompetences() {
    this.competencesService.getAll().subscribe(result => {
      if (result != null) {
        this.listCompetences = result;
      }
    }, error => {
    });
  }

  onItemSelect(item) {
    this.listCompetencesSearch.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
