import {Component} from '@angular/core'
import {SchedulePage} from '../schedule/schedule';
import {NewsPage} from '../news/news';
import {RatingPage} from '../rating/rating';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = SchedulePage;
    this.tab2Root = NewsPage;
    this.tab3Root = RatingPage;
  }
}
