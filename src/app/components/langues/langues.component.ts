import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LangueService } from 'src/app/services/langue.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-langues',
  templateUrl: './langues.component.html',
  styleUrls: ['./langues.component.css']
})
export class LanguesComponent implements OnInit {

  filter = false;
  showCode = true;
  showAjout = true;
  showLibelle = true;
  showModification = true;
  bsModalRef: BsModalRef;
  langueToAdd: any = {};
  langueToDelete;
  langueToUpdate;
  tryToSubmit = false;
  libelleFilter = '';
  dateAjoutFilter = '';
  dateFinFilter = '';
  codeFilter = '';
  langues;

  constructor(private modalService: BsModalService, private toastr: ToastrService, private langueService: LangueService) { }

  ngOnInit() {
    this.getAll();
  }

  showAddModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showFilter() {
    this.filter = !this.filter;
  }
  changeSettings(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  showUpdateModal(template, langue) {
    this.langueToUpdate = langue;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template, langue) {
    this.langueToDelete = langue;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addLangue() {
    this.tryToSubmit = true;
    if (this.langueToAdd && this.langueToAdd.code && this.langueToAdd.libelle) {
      this.langueService.addLangue(this.langueToAdd).subscribe(res => {
        this.bsModalRef.hide();
        this.toastr.success('Succés!', 'langue ajouté avec succés!');
        this.tryToSubmit = false;
        this.getAll();
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors d\'ajout de langue!');
      });
    }
  }

  updateLangue() {
    this.tryToSubmit = true;
    if (this.langueToUpdate && this.langueToUpdate.code && this.langueToUpdate.libelle) {
      this.langueService.updateLangue(this.langueToUpdate).subscribe(res => {
        this.bsModalRef.hide();
        this.toastr.success('Succés!', 'Langue mis à jour avec succés!');
        this.tryToSubmit = false;
      }, error => {
        this.toastr.error('Erreur!', 'Erreur lors de mise à jour de la langue');
      });
    }
  }

  deleteLangue() {
    this.langueService.deletelangue(this.langueToDelete.id).subscribe(res => {
      this.bsModalRef.hide();
      this.toastr.success('Succéss!', 'Langue supprimé avec succés!');
      this.getAll();
    }, error => {
      this.toastr.error('Erreur!', 'Erreur lors de suppression de la langue');
    });
  }

  getAll() {
    this.langueService.getAll().subscribe(res => {
      this.langues = res;
    });
  }

}
