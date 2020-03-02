import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DomaineService } from 'src/app/services/domaine.service';
import { Domaine } from 'src/app/modals/Domaine';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  filter = false;
  showIntitule = true;
  showAjout = true;
  showModification = true;
  bsModalRef: BsModalRef;
  listDomaines;
  domaineUpdated = new Domaine();
  domaineToDelete = new Domaine();
  domaineToAdd= new Domaine();
  constructor(private modalService: BsModalService, private toastr: ToastrService,private domaineService: DomaineService) { }

  ngOnInit() {
    this.getAllDomaines();
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

  showUpdateModal(template,domaine) {
    this.domaineUpdated = domaine;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
    this.updateDomaine();
  }
  showDeleteModal(template,domaine) {
    this.domaineToDelete=domaine;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  addDomaine() {
    this.domaineService.add( this.domaineToAdd).subscribe(result => {
      this.getAllDomaines();
    }, error => {
    });
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }

  updateDomaine() {
    this.domaineService.update( this.domaineUpdated).subscribe(result => {
      this.getAllDomaines();
    }, error => {
    });
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }

  deleteDomaine() {
    this.domaineService.delete(this.domaineToDelete.id).subscribe(result => {
      this.getAllDomaines();
    }, error => {
    });
    this.bsModalRef.hide();
    this.toastr.success('Success!', 'Success toast!');
    this.toastr.error('Error!', 'Error toast');
  }

  getAllDomaines(){ 
    this.domaineService.getAll().subscribe(result => {
      if (result != null) {
        this.listDomaines=result;
      }
    }, error => {
    });
  }
}
