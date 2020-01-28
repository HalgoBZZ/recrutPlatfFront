import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CandidatService } from 'src/app/services/CandidatService';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {

  filter = false;
  showEmail = false;
  showAjout = false;
  showNom = true;
  showPrenom = true;
  showDateNaiss = true;
  showDiplome = true;
  showCV = false;
  showTel = false;
  showTitre = true;
  showAdresse = true;
  showNationalite = false;
  showPhoto = true;
  showModification = false;
  bsModalRef: BsModalRef;
  data;
  listCandidat;
  constructor(private modalService: BsModalService, private toastr: ToastrService,
    private candidatService : CandidatService) { }

  ngOnInit() {
    this.candidatService.getAll().subscribe(result => {
      console.log('dd ==>',result)
      if (result == null) {
        this.data = false;
      } else {
        this.listCandidat=result;
        this.data = true;
      }
    }, error => {
      this.data = true;
      ;
    });
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

  showUpdateModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showDeleteModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showInfoModal(template) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  addCandidat() {
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }

  updateCandidat() {
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }

  deleteCandidat() {
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }



}
