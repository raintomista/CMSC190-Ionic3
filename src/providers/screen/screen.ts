import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ScreenProvider {
  constructor(public http: HttpClient) {
  }

  addScreen(formData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + '/screens', formData, { headers: headers })
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  getScreens(projectId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/screens?project_id=' + projectId)
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  getScreen(id) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/screens/' + id)
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateScreen(screen) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiUrl + '/screens/' + screen.id, screen)
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }
}
