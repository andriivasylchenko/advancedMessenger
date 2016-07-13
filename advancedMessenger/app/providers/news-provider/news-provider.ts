import {Injectable} from '@angular/core';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NewsProvider {
  data: any = null;

  constructor() {}

  load() {
    console.log('---> called NewsProvider load');  

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      
      let dataRequest = new WLResourceRequest("/adapters/JavaHTTP/", WLResourceRequest.GET);

      dataRequest.send().then((response) => {
        console.log('--> data loaded from adapter', response);

        this.data = response.responseJSON.news;
        resolve(this.data)
      }, (failure) => {
        console.log('--> failed to load data', failure);
        resolve('error')
      })

    });
  }
}

