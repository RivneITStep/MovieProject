import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Result } from '../models/result.model';
import jwt_decode from "jwt-decode";
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:5000/api/account';
  loginStatus = new EventEmitter<boolean>();

  login(model: LoginModel) {
    return this.http.post<Result>(this.baseUrl + '/login', model);
  }

  isLoggedIn() {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  isAdmin() {
    var token = localStorage.getItem('token');
    if (token != null) {
      var decoded = jwt_decode(token);
      var role = (decoded as UserModel).role;
      if (role == 'admin') {
        return true;
      }
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    this.loginStatus.emit(false);
  }

}
