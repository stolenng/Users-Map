import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  get() {
    return this.http.get('/assets/users.json')
              .toPromise()
              .then(res => res.json())
              .catch(err => {
                throw new Error('Error in request!')
              });
  }

}
