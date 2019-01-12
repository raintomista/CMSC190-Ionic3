import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectProvider {

  constructor(public http: HttpClient) {
  }

  getProjects(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/projects?user_id=' + userId)
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  addProject(data) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + '/projects', data)
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  editProject(id, name) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.apiUrl + '/projects/' + id, { name })
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteProject(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.apiUrl + '/projects/' + id)
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }

  getHistory(id) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/projects/' + id + '/history')
        .subscribe((response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        });
    });
  }
}
