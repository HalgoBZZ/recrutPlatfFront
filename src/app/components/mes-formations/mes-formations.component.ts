import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CandidatService } from 'src/app/services/candidat.service';
import { CandidatFormationService } from 'src/app/services/candidat-formation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormationService } from 'src/app/services/formation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mes-formations',
  templateUrl: './mes-formations.component.html',
  styleUrls: ['./mes-formations.component.css']
})
export class MesFormationsComponent implements OnInit {
  candidatFormations;
  formationToAdd: any = {};
  formationToUpdate;
  formationToDelete;
  bsModalRef: BsModalRef;
  login;
  tryToSubmit = false;
  maxDate = new Date();

  constructor(private modalService: BsModalService, private candidatService: CandidatService,
    private candidatFormationService: CandidatFormationService, private spinner: NgxSpinnerService,
    private formationService: FormationService, private toastr: ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.login = localStorage.getItem('login');
    this.getAll();
  }


  showUpdateModal(template, candidatformation) {
    this.formationToUpdate = candidatformation.formation;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, candidatformation) {
    this.formationToDelete = candidatformation;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  getAll() {
    this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
      const candidat: any = cnd;
      this.candidatFormationService.getByCandidat(candidat.id).subscribe(data => {
        this.candidatFormations = data;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log('erreur lors de recuperation des formations par candidat');
      });
    }, error => {
      this.spinner.hide();
      console.log('erreur lors de recuperation du candidat');
    });
  }

  validDate(date) {
    return new Date(date) < this.maxDate;
  }

  addFormation() {
    if (this.verifFormation(this.formationToAdd)) {
      this.spinner.show();
      this.formationService.add(this.formationToAdd).subscribe(res => {
        const result: any = res;
        this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
          const candidat: any = cnd;
          const candidatFormation = {
            candidat,
            formation: result
          };
          this.candidatFormationService.save(candidatFormation).subscribe(data => {
            this.spinner.hide();
            this.toastr.success('Succés!', 'Formation ajouté avec succés!');
            this.tryToSubmit = false;
            this.getAll();
            this.bsModalRef.hide();
          }, error => {
            this.spinner.hide();
            console.log('error lors d\'ajout de CandidatFormation');
            this.bsModalRef.hide();
          });
        }, error => {
          this.spinner.hide();
          console.log('erreur lors de recuperation du candidat');
          this.bsModalRef.hide();
        });
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors d\'ajout de formation!');
        console.log('erreur lors d\'ajout de formation');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    } else {
      this.tryToSubmit = true;
    }
  }

  updateFormation() {
    if (this.verifFormation(this.formationToUpdate)) {
      this.spinner.show();
      this.formationService.update(this.formationToUpdate).subscribe(res => {
        this.spinner.hide();
        this.toastr.success('Succés!', 'Formation mise à jour avec succés!');
        this.tryToSubmit = false;
        this.getAll();
        this.bsModalRef.hide();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors mise à jour de formation!');
        console.log('erreur lors de mise à jour de formation');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    } else {
      this.tryToSubmit = true;
    }
  }

  delete() {
    this.spinner.show();
    this.candidatFormationService.delete(this.formationToDelete.id).subscribe(result => {
      this.formationService.delete(this.formationToDelete.formation.id).subscribe(res => {
        this.spinner.hide();
        this.toastr.success('Succés!', 'Formation supprimé avec succés!');
        this.getAll();
        this.bsModalRef.hide();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors de la suppression de la formation!');
        console.log('Erreur lors de la suppression de la formation');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de la suppression de la formation!');
      console.log('Erreur lors de la suppression de la formation');
      this.spinner.hide();
      this.bsModalRef.hide();
    });
  }

  verifFormation(formation) {
    return (formation && formation.titre && formation.etablissement && formation.debut && formation.fin &&
      formation.debut < formation.fin && this.validDate(formation.debut) && this.validDate(formation.fin));
  }
}
