import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/result.model';
import { UserModel } from 'src/app/models/user.model';

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

  editUser(id: string, model: UserModel){
    return this.http.post<ApiResult>(this.baseUrl + '/editUser/' + id, model);
  }

}
