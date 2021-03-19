import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { ApiResult } from '../models/result.model';
import jwt_decode from 'jwt-decode';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/Account';
  loginStatus = new EventEmitter<boolean>();

  SignUp(UserRegisterDTO: RegisterModel): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + '/register', UserRegisterDTO);
  }

  SignIn(UserLoginDTO: LoginModel) {
    return this.http.post<ApiResult>(this.baseUrl + '/login', UserLoginDTO);
  }

  recoverPassword(email: string){
    return this.http.post<ApiResult>(this.baseUrl + '/recover/password', { email: email });
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token !== null) {

      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);

      if (decodedJwtData.roles === 'User') {
        return false;
      } else if (decodedJwtData.roles === 'Admin') {
        return true;
      }

    } else {
      return false;
    }
  }

  getCurrentUser(){
    var token = localStorage.getItem('token');
    if(token != null){
      return jwt_decode(token) as UserModel;
    }
    return new UserModel();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return true;
    } else {
      return false;
    }
  }

  Logout() {
    localStorage.removeItem('token');
    this.loginStatus.emit(false);
  }
}
