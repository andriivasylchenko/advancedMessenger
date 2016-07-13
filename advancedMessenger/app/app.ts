import {Component, Renderer} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  private rootPage:any;

  constructor(private platform:Platform, renderer: Renderer ) {

    console.log('constructor done');

    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      console.log('--> MFP API init complete');

      this.MFPInitComplete();
    })

      
    
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  MFPInitComplete(){
    console.log('--> MFPInitComplete function called')
    this.rootPage = TabsPage; 
  }

}

ionicBootstrap(MyApp)
