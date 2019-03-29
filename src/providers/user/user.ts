import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/users/' + id)
        .subscribe((response) => {
          resolve(response)
        }, (err) => {
          reject(err);
        });
    });
  }

  signup(user) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + '/users', user)
        .subscribe((response) => {
          resolve(response)
        }, (err) => {
          reject(err);
        });
    });
  }
}
