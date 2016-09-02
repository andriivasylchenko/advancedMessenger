import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StorageProvider} from '../../providers/storage-provider/storage-provider';

/*
  Generated class for the NewsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/news/news.html',
  providers: [StorageProvider]
})
export class NewsPage {

  news: any;


  constructor(public nav: NavController, public newsData: StorageProvider) {
    console.log('---> NewsPage init');

    this.loadNews();
  }

  loadNews() {
      this.newsData.getAll().then((results) => {
          console.log('---> news loaded');
          this.news = results;
      }, (failure) => {
          console.log('---> failed to load news', failure);
      })
  }
}