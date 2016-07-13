import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NewsProvider} from '../../providers/news-provider/news-provider';

/*
  Generated class for the NewsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/news/news.html',
  providers: [NewsProvider]
})
export class NewsPage {

  news: any;


  constructor(public nav: NavController, public newsData: NewsProvider) {
    console.log('---> NewsPage init');

    this.loadNews();
  }

  loadNews() {
      this.newsData.load().then((results) => {
          console.log('---> news loaded');
          this.news = results;
      }, (failure) => {
          console.log('---> failed to load news', failure);
      })
  }
}