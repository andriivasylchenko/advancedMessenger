import {Component, Renderer} from '@angular/core';
import {Platform, Alert, App, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {PushProvider} from './providers/push-provider/push-provider';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [PushProvider]
})
export class MyApp {
  private rootPage:any;
  private AuthHandler: any;
  private nav: any;

  constructor(private platform:Platform, renderer: Renderer, private app: App, private push: PushProvider ) {

    console.log('constructor done');

    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      console.log('--> MFP API init complete');

      this.MFPInitComplete();
    })

      
    
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  ngAfterViewInit(){
    this.nav = this.app.getActiveNav();
  }

  MFPInitComplete(){
    console.log('--> MFPInitComplete function called')
    this.rootPage = TabsPage; 
    this.push.init();
    this.AuthInit();
  }

  AuthInit(){
    this.AuthHandler = WL.Client.createSecurityCheckChallengeHandler("UserLogin");

    this.AuthHandler.handleChallenge = ((response) => {
        console.log('--> inside handleChallenge');

        if(response.errorMsg){
          var msg = response.errorMsg + '<br>';
          msg += 'Remaining attempts: ' + response.remainingAttempts;
        }

        this.displayLogin(msg);
    })

  }

  displayLogin(msg) {
      let prompt = Alert.create({
      title: 'Login',
      message: msg,
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Login',
          handler: data => {
            console.log('--> Trying to auth with user', data.username);

            this.AuthHandler.submitChallengeAnswer(data);
          }
        }
      ]
    });

    this.nav.present(prompt);

  }

}

ionicBootstrap(MyApp)
