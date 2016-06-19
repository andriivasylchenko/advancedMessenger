import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {ScheduleProvider} from '../../providers/schedule-provider/schedule-provider';
import {TimeDivider} from '../../pipes/time-divider';

@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
  providers: [ScheduleProvider],
  pipes: [TimeDivider]
})
export class SchedulePage {
  constructor(public nav: NavController, public schedule: ScheduleProvider) {
    console.log('---> SchedulePage init');

    this.loadSchedule();
  }

  delivery: any; 
  times: any;

  loadSchedule() {
      console.log('---> loading schedule');
      this.schedule.load().then((results) => {
          
          let tm = [];
          let geos = null;
          
          for (var i=0; i < results.length; i++) {
              geos += results[i].address + '|';
              if (tm.indexOf(results[i].time) == -1) tm.push(results[i].time)
          }
          console.log('---> times array', tm)
          this.times = tm;
          this.delivery = results;
          
          this.schedule.calc(geos).then((results) => {
              for (var i=0; i < results.length; i++) {
                  this.delivery[i].distance = results[i].distance.text;
                  
                  if (results[i].duration_in_traffic.value > results[i].duration.value) {
                      this.delivery[i].traffic = true;
                      this.delivery[i].duration = results[i].duration_in_traffic.text;
                  } else {
                      this.delivery[i].traffic = false;
                      this.delivery[i].duration = results[i].duration.text;
                  }
              }
          })
          
          
      })
  }
  
  displayDetails(item) {
      
      let endTime = parseInt(item.time);
      endTime++;
      let msg = 'Delivery time: from ' + item.time + ':00 to ' + endTime + ':00<br>';
      msg += 'Address: ' + item.address;
      
      let prompt = Alert.create({
          title: 'Delivery details',
          subTitle: item.name,
          message: msg,
          buttons: [
              {
                  text: 'Close'
              },
              {
                  text: 'Navigate',
                  handler: data => {
                      console.log('---> Trying to navigate to address ', item.address);
                      
                      let geoLoc = 'geo:?q="' + item.address + '"';
                      
                      this.launchExternal(geoLoc);
                  }
              },
              {
                  text: 'Call',
                  handler: data => {
                      console.log('---> trying to call to ' + item.name + ' ' + item.phone);
                      
                      let pn = 'tel:' + item.phone;
                      
                      this.launchExternal(pn);
                  }
              },
              {
                  text: 'Delivered',
                  handler: data => {
                      console.log('---> Item delivered', item);
                      
                      let index = this.delivery.indexOf(item);
                      this.delivery[index].delivered = true;
                  }
              }
          ]
      });
      
      this.nav.present(prompt);
  }
  
  launchExternal(url) {
      window.location = url;
  }

}


  

