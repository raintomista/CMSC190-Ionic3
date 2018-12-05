import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectProvider {

  constructor(public http: HttpClient) {
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/projects')
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }
}
