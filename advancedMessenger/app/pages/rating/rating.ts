import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EmployeeProvider} from '../../providers/employee-provider/employee-provider';

/*
  Generated class for the RatingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/rating/rating.html',
  providers: [EmployeeProvider]
})
export class RatingPage {

  items:any;  

  constructor(public employees: EmployeeProvider) {
      console.log('---> RatingPage init');
      
      this.loadEmployees();
  }

  loadEmployees() {
      console.log('---> called loadEmployees');
      this.employees.load().then((data) => {
          this.items = data;
      })
  }
}

