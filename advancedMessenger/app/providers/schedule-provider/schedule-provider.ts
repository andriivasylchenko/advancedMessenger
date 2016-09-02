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
          let dataRequest = new WLResourceRequest("http://192.168.42.169:4567/schedule", WLResourceRequest.GET);

          dataRequest.send().then((response) => {
            console.log('--> data loaded from adapter', response);

            this.data = response.responseJSON.delivery;
            resolve(this.data)
          }, (failure) => {
            console.log('--> failed to load data', failure);
            resolve('error')
          })

        });
  }

  calc(destinations) {

    console.log('---> called ScheduleProvider calc');  

    if (this.distance) {
      // already loaded data
      return Promise.resolve(this.distance);
    }

    return new Promise(resolve => {

          let dataRequest = new WLResourceRequest("http://192.168.42.169:4567/distance", WLResourceRequest.GET);

          let curtime = Date.now();    
          let origin = '50.019275,14.347424';
          let googleParams = 'origins=' + origin + '&destinations=' + destinations + '&departure_time=' + curtime + '&traffic_model=best_guess';
          console.debug('google params', googleParams);

          dataRequest.setQueryParameter("origins", origin);
          dataRequest.setQueryParameter("destinations", destinations);
          dataRequest.setQueryParameter("departure_time", curtime);
          dataRequest.setQueryParameter("traffic_model", "best_guess");

          dataRequest.send().then((response) => {
            console.log('--> data loaded from adapter', response);
            this.distance = response.responseJSON;
            console.debug('Schedule calc data', this.distance.rows[0].elements);
            resolve(this.distance.rows[0].elements);

          }, (failure) => {
            console.log('--> failed to load data', failure);
            resolve('error')
          })

        });
  }

}











