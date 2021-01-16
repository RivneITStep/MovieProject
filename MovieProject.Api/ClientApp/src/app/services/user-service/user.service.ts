import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/usermanager';

  getUser(id: string){
    return this.http.get(this.baseUrl + '/' + id);
  }

  getUsers(){
    return this.http.get(this.baseUrl);
  }

}
