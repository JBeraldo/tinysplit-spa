import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  save (items:Object){
    let keyValueList =  Object.entries(items)
    for(let [index, [key, value]] of keyValueList.entries()){
        localStorage.setItem(key,value)
    }
  }

  getItem(key:string) {
    return localStorage.getItem(key)
  }

  removeItem(key: string){
    localStorage.removeItem(key)
  }
}
