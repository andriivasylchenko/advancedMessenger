import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ScheduleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ScheduleProvider {
  data: any = null;
  distance: any = null;

  constructor(public http: Http) {}

  load() {

    console.log('---> called ScheduleProvider load');  

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('http://localhost:4567/schedule')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          console.debug('Schedule load data', this.data.delivery);
          resolve(this.data.delivery);
        });
    });
  }

  calc(destinations) {

    console.log('---> called ScheduleProvider calc');  

    if (this.distance) {
      // already loaded data
      return Promise.resolve(this.distance);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.

      let curtime = Date.now();    
      let origin = '50.019275,14.347424';
      let googleParams = 'origins=' + origin + '&destinations=' + destinations + '&departure_time=' + curtime + '&traffic_model=best_guess';
      
      console.log('---> googleParams', googleParams);
      let path = 'https://maps.googleapis.com:443/maps/api/distancematrix/json?' + googleParams

      this.http.get(path)
        .map(res => res.json())
        .subscribe(distance => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.distance = distance;
          console.debug('Schedule calc data', this.distance.rows[0].elements);
          resolve(this.distance.rows[0].elements);
        });
    });
  }

}











