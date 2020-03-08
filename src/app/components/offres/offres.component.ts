import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import * as Highcharts from 'highcharts';
import { OffreService } from 'src/app/services/offre.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CompetenceService } from 'src/app/services/competence.service';
import { DomaineService } from 'src/app/services/domaine.service';
import { Candidat } from 'src/app/modals/Candidat';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
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
  pieChart;
  chartOptions;
  data;
  listOffre;
  listCompetencesSearch = [];
  listCompetences;
  listDomainesSearch = [];
  listDomaines;
  dropdownList = [];
  selectedItems = [];
  selectedItemsDomaines = [];
  dropdownSettings: IDropdownSettings;
  candidat;
  dropdownSettingsDomaine: IDropdownSettings;
  login;
  constructor(private modalService: BsModalService,
    private competencesService: CompetenceService, private offreService: OffreService, private domaineService: DomaineService,
    private candidatService: CandidatService) {
    this.pieChart = Highcharts;
  }

  ngOnInit() {
    this.getCandidat();
    this.getAll();
    this.getAllDomaines();
    this.getAllCompetences();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsDomaine = {
      singleSelection: false,
      idField: 'id',
      textField: 'intitule',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  getCandidat() {
    this.login = localStorage.getItem("login");
    this.candidatService.getCandidatByLogin(this.login).subscribe(result => {
      this.candidat = result;
    }, error => {
    });
  }

  getAll() {
    this.offreService.getAll().subscribe(result => {
      if (result == null) {
        this.data = false;
      } else {
        this.listOffre = result;
        this.data = true;
      }
    }, error => {
      this.data = true;
    });
    setTimeout(() => {
      this.createChart();
    }, 1000);
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

  submitSearch() { }
  getAllCompetences() {
    this.competencesService.getAll().subscribe(result => {
      if (result != null) {
        this.listCompetences = result;
      }
    }, error => {
      this.data = true;
    });
  }
  getAllDomaines() {
    this.domaineService.getAll().subscribe(result => {
      if (result != null) {
        this.listDomaines = result;
      }
    }, error => {
      this.data = true;
    });
  }
  onItemSelectDomaines(item) {
    this.listDomainesSearch.push(item);
    console.log('this.listDomainesSearch', this.listDomainesSearch);
  }
  onSelectAllDomaines(items: any) {
    console.log(items);
  }
  onItemSelect(item) {
    this.listDomainesSearch.push(item);
    console.log('this.listCompetencesSearch', this.listDomainesSearch);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  createChart() {
    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        // text: 'Correspondance<br/> de votre profil',
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -90,
          endAngle: -90,
          center: ['50%', '75%'],
          size: '80%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Correspondance de votre profil',
        innerSize: '50%',
        data: [
          ['', 58.9],
          {
            name: 'Other',
            y: 7.61,
            dataLabels: {
              enabled: false
            }
          }
        ]
      }]
    });
  }
  postuler(offre) {
    const login = localStorage.getItem('login');
    this.offreService.postuler(offre.id, login).subscribe(result => {

    }, error => {
    });
  }
  showPostulerButton(offre) {
    if (this.candidat) {
      for (let element of this.candidat.offres) {
        if (element.id === offre.id) {
          return false
        }
      }
      return true;
    }

  }
}
