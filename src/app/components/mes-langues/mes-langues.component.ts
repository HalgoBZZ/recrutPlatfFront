import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CandidatService } from 'src/app/services/candidat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CandidatLangueService } from 'src/app/services/candidat-langue.service';
import { ToastrService } from 'ngx-toastr';
import { LangueService } from 'src/app/services/langue.service';

@Component({
  selector: 'app-mes-langues',
  templateUrl: './mes-langues.component.html',
  styleUrls: ['./mes-langues.component.css']
})
export class MesLanguesComponent implements OnInit {

  candidatsLangues;
  langues: any = [];
  langueToAdd: any = {};
  langueToDelete;
  bsModalRef: BsModalRef;
  max = 5;
  login;
  tryToSubmit = false;
  maxDate = new Date();

  constructor(private modalService: BsModalService, private candidatService: CandidatService,
    private candidatLangueService: CandidatLangueService, private spinner: NgxSpinnerService,
    private langueService: LangueService, private toastr: ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.login = localStorage.getItem('login');
    this.getAll();
  }


  showUpdateModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, candidatLangue) {
    this.langueToDelete = candidatLangue;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  getAll() {
    this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
      const candidat: any = cnd;
      this.candidatLangueService.getByCandidat(candidat.id).subscribe(data => {
        this.candidatsLangues = data;
        this.langueService.getAll().subscribe(lgs => {
          this.langues = lgs;
        }, error => {
          this.spinner.hide();
          console.log('error when get langues');
        });
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log('erreur lors de recuperation des langues par candidat');
      });
    }, error => {
      this.spinner.hide();
      console.log('erreur lors de recuperation du candidat');
    });
  }

  exist(item, array) {
    for (const a of array) {
      console.log(a.langue.id, '===', item.id);
      if (a.langue.id === item.id) {
        return true;
      }
    }
    return false;
  }

  validDate(date) {
    return new Date(date) < this.maxDate;
  }

  addLangue() {
    this.tryToSubmit = true;
    if (this.verifLangue(this.langueToAdd)) {
      this.spinner.show();
      this.candidatService.getCandidatByLogin(this.login).subscribe(cnd => {
        this.langueToAdd.candidat = cnd;
        this.candidatLangueService.save(this.langueToAdd).subscribe(data => {
          this.spinner.hide();
          this.toastr.success('Succés!', 'Langue ajouté avec succés!');
          this.tryToSubmit = false;
          this.getAll();
          this.bsModalRef.hide();
          this.langueToAdd = {};
        }, error => {
          this.spinner.hide();
          console.log('error lors d\'ajout de Candidat Langue');
          this.bsModalRef.hide();
        });
      }, error => {
        this.spinner.hide();
        console.log('erreur lors de recuperation du candidat');
        this.bsModalRef.hide();
      });
    } else {
      this.tryToSubmit = true;
    }
  }

  updateLangue(candidatsLangues) {
    for (const lg of candidatsLangues) {
      this.spinner.show();
      this.candidatLangueService.update(lg).subscribe(res => {
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors mise à jour de langue!');
        console.log('erreur lors de mise à jour de langue');
        this.spinner.hide();
        this.bsModalRef.hide();
      });
    }
    this.spinner.hide();
    this.toastr.success('Succés!', 'Langue mise à jour avec succés!');
    this.getAll();
    this.bsModalRef.hide();
  }

  delete() {
    this.spinner.show();
    this.candidatLangueService.delete(this.langueToDelete.id).subscribe(result => {
      this.spinner.hide();
      this.toastr.success('Succés!', 'Langue supprimé avec succés!');
      this.getAll();
      this.bsModalRef.hide();
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de la suppression de la langue!');
      console.log('Erreur lors de la suppression de la langue');
      this.spinner.hide();
      this.bsModalRef.hide();
    });
  }

  verifLangue(candidatLangue) {
    return (candidatLangue && candidatLangue.langue && candidatLangue.niveau > 1);
  }

}
