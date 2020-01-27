import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit() {
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

}
