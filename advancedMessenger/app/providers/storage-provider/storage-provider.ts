import {Injectable} from '@angular/core';


/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {
  data: any = null;

  constructor() {}

  init() {

    console.log('--> JSONStore init function called');

    let collections = {
      news: {
        searchFields: {text: 'string', date: 'string'}
      }
    }

    WL.JSONStore.init(collections).then((success) => {
      console.log('-->JSONStore init success')
    }, (failure) => {
      console.log('-->JSONStore init failed', failure)
    })
    
  }

  put(data){
    console.log('--> JSONStore put function called');

    let collectionName = 'news';
    let options = {
      replaceCriteria: ['text', 'date'],
      addNew: true,
      markDirty: false
    };

    WL.JSONStore.get(collectionName).change(data, options).then((success) => {
      console.log('--> JSONStore put success')
    }, (failure) => {
      console.log('--> JSONStore put failed', failure)
    })
  }

  getAll() {

    console.log('--> JSONStore get all function called');

    return new Promise( resolve => {
      let collectionName = 'news';
      let options = {};

      WL.JSONStore.get(collectionName).findAll(options).then((success) => {
        console.log('-->JSONStore get docs success', success)
        resolve(success);
      }, (failure) => {
        console.log('-->JSONStore get docs failed', failure)
        resolve('error');
      })

    })
      
  }
}

