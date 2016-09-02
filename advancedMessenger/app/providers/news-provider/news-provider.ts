import {Injectable} from '@angular/core';
import {StorageProvider} from '../storage-provider/storage-provider';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NewsProvider {
  data: any = null;

  constructor(private storage: StorageProvider) {}

  load() {
    console.log('---> called NewsProvider load');  
      
      let dataRequest = new WLResourceRequest("/adapters/JavaHTTP/", WLResourceRequest.GET);

      dataRequest.send().then((response) => {
        console.log('--> data loaded from adapter', response);

        this.data = response.responseJSON.news;
        console.log('--> puttin data to JSONStore');
        this.storage.put(this.data);

      }, (failure) => {
        console.log('--> failed to load data', failure);

      })

  }
}

