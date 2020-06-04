import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CandidatService } from 'src/app/services/candidat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CandidatExperienceService } from 'src/app/services/candidat-experience.service';
import { ToastrService } from 'ngx-toastr';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-mes-experiences',
  templateUrl: './mes-experiences.component.html',
  styleUrls: ['./mes-experiences.component.css']
})
export class MesExperiencesComponent implements OnInit {

  candidatExperiences;
  experienceToAdd: any = {};
  experienceToUpdate;
  experienceToDelete;
  experienceToDisplay;
  bsModalRef: BsModalRef;
  login;
  tryToSubmit = false;
  maxDate = new Date();

  constructor(private modalService: BsModalService, private candidatService: CandidatService,
    private candidatExperienceService: CandidatExperienceService, private spinner: NgxSpinnerService,
    private experienceService: ExperienceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.login = localStorage.getItem('login');
    this.getAll();
  }


  showUpdateModal(template, candidatExperience) {
    this.experienceToUpdate = candidatExperience.experience;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, candidatExperience) {
    this.experienceToDelete = candidatExperience;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showInfoModal(template, cf) {
    this.experienceToDisplay = cf.experience;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  getAll() {
    this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
      const candidat: any = cnd;
      this.candidatExperienceService.getByCandidat(candidat.id).subscribe(data => {
        this.candidatExperiences = data;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log('erreur lors de recuperation des experiences par candidat');
      });
    }, error => {
      this.spinner.hide();
      console.log('erreur lors de recuperation du candidat');
    });
  }

  validDate(date) {
    return new Date(date) < this.maxDate;
  }

  addExperience() {
    if (this.verifExperience(this.experienceToAdd)) {
      this.spinner.show();
      this.experienceService.add(this.experienceToAdd).subscribe(res => {
        const result: any = res;
        this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
          const candidat: any = cnd;
          const candidatExperience = {
            candidat,
            experience: result
          };
          this.candidatExperienceService.save(candidatExperience).subscribe(data => {
            this.spinner.hide();
            this.toastr.success('Succés!', 'Experience ajouté avec succés!');
            this.tryToSubmit = false;
            this.getAll();
            this.bsModalRef.hide();
          }, error => {
            this.spinner.hide();
            console.log('error lors d\'ajout de CandidatExperience');
            this.bsModalRef.hide();
          });
        }, error => {
          this.spinner.hide();
          console.log('erreur lors de recuperation du candidat');
          this.bsModalRef.hide();
        });
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors d\'ajout de experience!');
        console.log('erreur lors d\'ajout de experience');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    } else {
      this.tryToSubmit = true;
    }
  }

  updateExperience() {
    if (this.verifExperience(this.experienceToUpdate)) {
      this.spinner.show();
      this.experienceService.update(this.experienceToUpdate).subscribe(res => {
        this.spinner.hide();
        this.toastr.success('Succés!', 'Experience mise à jour avec succés!');
        this.tryToSubmit = false;
        this.getAll();
        this.bsModalRef.hide();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors mise à jour de experience!');
        console.log('erreur lors de mise à jour de experience');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    } else {
      this.tryToSubmit = true;
    }
  }

  delete() {
    this.spinner.show();
    this.candidatExperienceService.delete(this.experienceToDelete.id).subscribe(result => {
      this.experienceService.delete(this.experienceToDelete.experience.id).subscribe(res => {
        this.spinner.hide();
        this.toastr.success('Succés!', 'Experience supprimé avec succés!');
        this.getAll();
        this.bsModalRef.hide();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors de la suppression de la experience!');
        console.log('Erreur lors de la suppression de la experience');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de la suppression de la experience!');
      console.log('Erreur lors de la suppression de la experience');
      this.spinner.hide();
      this.bsModalRef.hide();
    });
  }

  verifExperience(experience) {
    return (experience && experience.employeur && experience.lieu && experience.titre && experience.description
      && experience.debut && experience.fin &&
      experience.debut < experience.fin && this.validDate(experience.debut) && this.validDate(experience.fin));
  }

}
