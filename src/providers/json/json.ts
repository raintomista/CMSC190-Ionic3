import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JsonProvider {

  constructor(public http: HttpClient) {
  }

  getIonIcons() {
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/json/ion-icons.json')
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }
}
