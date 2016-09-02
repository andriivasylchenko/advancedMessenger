import {Injectable} from '@angular/core';

@Injectable()
export class PushProvider {
  data: any = null;

  constructor() {}

  init() {
   
    console.log('--> PushProvider init called');

    MFPPush.initialize(
    function(success){
      console.log('--> Push init success');

      MFPPush.registerNotificationsCallback(pushNotificationReceived);

      var options = {"phoneNumber": ""};

      MFPPush.registerDevice(
        options,
        function(success){
          console.log('--> Push registration success');

          var tag = ['am'];

          MFPPush.subscribe(
            tag,
            function(success){
              console.log('--> Push subscribe success');
            },
            function(failure){
              console.log('--> Push subscribe failure', failure);
            }
          )

        },
        function(failure){
          console.log('--> Push registration failure', failure);
        }
      )

    }, function(failure){
      console.log('--> Push init failure', failure);
    })

    function pushNotificationReceived(message){
      console.log('--> Push received', message);
      alert(message.alert);
    }

  }
}

