import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CandidatService } from 'src/app/services/CandidatService';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
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
  idCandidatToDelete: any;
  candidatDetail: any;
  fileUrl: any;
  fileName: string;
  constructor(private modalService: BsModalService, private toastr: ToastrService,
    private candidatService: CandidatService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.candidatService.getAll().subscribe(result => {
      console.log('dd ==>', result)
      if (result == null) {
        this.data = false;
      } else {
        this.listCandidat = result;
        this.data = true;
      }
    }, error => {
      this.data = true;
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
  showDeleteModal(template, id) {
    this.idCandidatToDelete = id;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  showInfoModal(template, candidat) {
    this.candidatDetail = candidat;
    console.log(' this.candidatDetail ==>', this.candidatDetail)

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
    this.candidatService.deleteCandidat(this.idCandidatToDelete).subscribe(result => {
      if (result == true) {
        this.getAll();
        this.toastr.success('Success!', 'Success toast!');

      }
    }, error => {
      this.data = true;
      this.toastr.error('Error!', 'Error toast');

    });
    this.bsModalRef.hide();
  }


  downLoadFile(data, candidat) {
    const fileName = candidat + "CV";
    const blobData = this.convertBase64ToBlobData(data);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
      window.navigator.msSaveOrOpenBlob(blobData, fileName);
    } else {
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }
  convertBase64ToBlobData(base64Data) {
    const sliceSize = 512;
    const contentType = 'image/png';
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


}
