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
import { LangueService } from 'src/app/services/langue.service';
import { OffreLangueService } from 'src/app/services/offre-langue.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Domaine } from 'src/app/modals/Domaine';
import { CandidatureService } from 'src/app/services/candidature.service';
import { CandidatLangueService } from 'src/app/services/candidat-langue.service';
import { CandidatExperienceService } from 'src/app/services/candidat-experience.service';
import { CandidatCompetenceService } from 'src/app/services/candidat-competence.service';

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
  addComp = false;
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
  offreToAdd = new Offre();
  employeur = new Employeur();
  employeurConnected;
  listLangues = [];
  candidatures;
  langues;
  languesByOffres = [];
  languesOffres = [];
  tryToSubmitForm = false;
  offreToUpdate;
  offreToDelete;
  filterObject = {
    domaine: new Domaine(),
    etude: 0,
    salaire: 0,
    experience: 0,
    competences: []
  };
  candidats = [];
  candidatureDetails;
  candidatExperience = [];
  candidatCompetences = [];
  candidatLangues = [];
  constructor(private modalService: BsModalService, private toastr: ToastrService, private offreService: OffreService,
    private competencesService: CompetenceService, private langueOffreService: OffreLangueService, private spinner: NgxSpinnerService,
    private domaineService: DomaineService, private utilisateurService: UtilisateurService, private langueService: LangueService,
    private candidatureService: CandidatureService, private candidatLangueService: CandidatLangueService,
    private candidatExperienceService: CandidatExperienceService, private candidatCompetenceService: CandidatCompetenceService) { }

  ngOnInit() {
    console.log('offreToAdd:', this.offreToAdd);
    this.spinner.show();
    this.getEmployeurConnected();
    this.getAllDomaines();
    this.getAllLangues();
    this.getAll();
    this.dropdownSettingsDomaine = {
      singleSelection: true,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Selectionner tous',
      unSelectAllText: 'Deselectionner tous',
      itemsShowLimit: 100,
      allowSearchFilter: true
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Selectionner tous',
      unSelectAllText: 'Deselectionner tous',
      itemsShowLimit: 100,
      allowSearchFilter: true
    };
  }


  getAllLangues() {
    this.langueService.getAll().subscribe(lgs => {
      this.langues = lgs;
      this.initLanguesOffres(this.langues);
    });
  }

  initLanguesOffres(langues) {
    for (const lg of langues) {
      this.languesOffres.push({
        langue: lg,
        offre: '',
        niveau: 0
      });
    }
  }
  getEmployeurConnected() {
    this.login = localStorage.getItem('login');
    this.utilisateurService.getByLogin(this.login).subscribe(result => {
      this.employeurConnected = result;
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
    this.getAll();
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  byId(item1, item2) {
    if (item1 && item2) {
      return item1.id === item2.id;
    }
  }

  showUpdateModal(template, offre) {
    this.offreToUpdate = offre;
    this.getLanguesOffreByOffre();
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, offre) {
    this.offreToDelete = offre;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showInfoModal(template, candidature) {
    this.candidatureDetails = candidature;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  getLanguesOffreByOffre() {
    this.langueOffreService.getByOffre(this.offreToUpdate.id).subscribe(data => {
      const langues: any = data;
      for (const l of langues) {
        for (const lo of this.languesOffres) {
          if (l.langue.id === lo.langue.id) {
            lo.id = l.id;
            lo.niveau = l.niveau;
          }
        }
      }
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
    this.myoffres = filteredOffres;
    this.bsModalRef.hide();
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

  addCompetence() {
    this.addComp = true;
  }

  addOffre(languesOffres) {
    if (this.validateOffre(this.offreToAdd)) {
      this.tryToSubmitForm = false;
      this.utilisateurService.getByLogin(this.login).subscribe(emp => {
        this.offreToAdd.employeur = emp;
        this.offreService.saveOffre(this.offreToAdd).subscribe(result => {
          this.getAll();
          if (languesOffres) {
            for (const lo of languesOffres) {
              if (lo.niveau > 0) {
                lo.offre = result;
                this.langueOffreService.save(lo).subscribe(data => {
                  this.bsModalRef.hide();
                  this.toastr.success('Success!', 'Offre ajouté avec succés!');
                }, error => {
                  this.bsModalRef.hide();
                  this.toastr.error('Error!', 'Une erreur s\'est produite lors de l\'ajout de l\'offre');
                });
              }
            }
          }
        }, error => {
          this.bsModalRef.hide();
          this.toastr.error('Error!', 'Une erreur s\'est produite lors de l\'ajout de l\'offre');
        });
      });
    } else {
      this.tryToSubmitForm = true;
    }
  }


  deleteOffre() {
    this.spinner.show();
    this.deleteLanguesOffreByOffre(this.offreToDelete.id);
    this.offreService.deleteOffre(this.offreToDelete.id).subscribe(data => {
      this.getAll();
      this.toastr.success('Success!', 'Offre supprimé avec succés!');
    }, error => {
      this.bsModalRef.hide();
      this.spinner.hide();
      this.toastr.error('Error!', 'Une erreur s\'est produite lors de la suppression de l\'offre');
    });
  }

  deleteLanguesOffreByOffre(id) {
    this.langueOffreService.deleteByOffre(id).subscribe(data => {
      this.spinner.hide();
      this.bsModalRef.hide();
    }, error => {
      this.bsModalRef.hide();
      this.spinner.hide();
      this.toastr.error('Error!', 'Une erreur s\'est produite lors de la suppression de l\'offre');
    });
  }


  updateOffre(languesOffres) {
    if (this.validateOffre(this.offreToUpdate)) {
      this.tryToSubmitForm = false;
      this.offreService.saveOffre(this.offreToUpdate).subscribe(result => {
        this.getAll();
        if (languesOffres) {
          for (const lo of languesOffres) {
            if (lo.niveau > 0) {
              lo.offre = result;
              this.langueOffreService.save(lo).subscribe(data => {
                this.bsModalRef.hide();
                this.toastr.success('Success!', 'Offre mis à jour avec succés!');
              }, error => {
                this.bsModalRef.hide();
                this.toastr.error('Error!', 'Une erreur s\'est produite lors de mise à jour de l\'offre');
              });
            }
          }
        }
      }, error => {
        this.bsModalRef.hide();
        this.toastr.error('Error!', 'Une erreur s\'est produite lors de mise à jour de l\'offre');
      });
    } else {
      this.tryToSubmitForm = true;
    }
  }

  getAll() {
    this.utilisateurService.getByLogin(this.login).subscribe(emp => {
      const employer: any = emp;
      this.offreService.getMyOffres(employer.id).subscribe(result => {
        this.myoffres = result;
        for (const offre of this.myoffres) {
          this.langueOffreService.getByOffre(offre.id).subscribe(data => {
            this.languesByOffres[offre.id] = data;
          }, error => {
            this.spinner.hide();
            console.log('error when get langues by offres');
          });
          this.candidats[offre.id] = [];
          this.candidatureService.getByOffre(offre.id).subscribe(data => {
            const candidatures: any = data;
            for (const candidature of candidatures) {
              this.candidats[offre.id].push(candidature);
              this.getCandidatExperiences(candidature.candidat.id);
              this.getCandidatCompetences(candidature.candidat.id);
              this.getCandidatLangues(candidature.candidat.id);
            }
            console.log('**************:', this.candidats);
          }, error => {
            this.spinner.hide();
            console.log('error when get candidatures by offres');
          });
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log('error when get offres by emplyer');
      });
    }, error => {
      this.spinner.hide();
      console.log('error when get connected employer');
    });
  }

  getCandidatExperiences(candidat) {
    this.candidatExperienceService.getByCandidat(candidat).subscribe(data => {
      this.candidatExperience[candidat] = data;
    }, error => {
      this.spinner.hide();
      console.log('error when get experiences by candidat');
    });
  }

  getCandidatCompetences(candidat) {
    this.candidatCompetenceService.getByCandidat(candidat).subscribe(data => {
      this.candidatCompetences[candidat] = data;
    }, error => {
      this.spinner.hide();
      console.log('error when get competences by candidat');
    });
  }

  getCandidatLangues(candidat) {
    this.candidatLangueService.getByCandidat(candidat).subscribe(data => {
      this.candidatLangues[candidat] = data;
    }, error => {
      this.spinner.hide();
      console.log('error when get langues by candidat');
    });
  }

  onItemSelectDomaines() {
    this.offreToAdd.competences = [];
    this.getAllCompetences(this.offreToAdd.domaine);
  }
  onItemSelectUpDomaines() {
    this.offreToUpdate.competences = [];
    this.getAllCompetences(this.offreToUpdate.domaine);
  }

  getAllDomaines() {
    this.domaineService.getAll().subscribe(result => {
      if (result != null) {
        this.listDomaines = result;
      }
    }, error => {
    });
  }
  getAllCompetences(item) {
    this.competencesService.getByDomaine(item.id).subscribe(result => {
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

  validateOffre(offre) {
    return (offre.poste.intitule && offre.poste.description && offre.domaine &&
      offre.niveauEtude > 0 && offre.horaire > 0 && offre.salaire > 0 && offre.niveauExperience > 0 &&
      offre.competences.length > 0);
  }

  onItemSelectFilterDomaines(event) {
    this.filterObject.domaine = event;
    this.getAllCompetences(this.filterObject.domaine);
  }

  openPDF(pj) {
    const linkSource = `data:application/pdf;base64,${pj}`;
    const downloadLink = document.createElement('a');
    const fileName = 'CV.pdf';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  accepter(candidature) {
    this.spinner.show();
    this.candidatureService.accept(candidature).subscribe(data => {
      this.getAll();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log('error when accept candidature');
    });
  }

  refuser(candidature) {
    this.spinner.show();
    this.candidatureService.refuse(candidature).subscribe(data => {
      this.getAll();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log('error when refuse candidature');
    });
  }
}
