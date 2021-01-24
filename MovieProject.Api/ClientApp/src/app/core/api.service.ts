import { RegisterModel } from '../models/register.model';
import { SignInModel } from '../models/login.model';
import{ Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../models/result.model';

@Injectable({
    providedIn: 'root'
})

export class ApiService{
    constructor(private http: HttpClient){ }
    baseUrl = location.origin + '/api/Account';
    loginStatus = new EventEmitter<boolean>();

    SignUp(UserRegisterDTO: RegisterModel): Observable<ApiResult>{
        return this.http.post<ApiResult>(this.baseUrl + '/register', UserRegisterDTO);
    }

    SignIn(UserLoginDTO: SignInModel){
        return this.http.post<ApiResult>(this.baseUrl + '/login', UserLoginDTO);
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

    isLoggedIn() {
        const token = localStorage.getItem('token');
        if (token !== null) {
          return true;
        } else {
          return false;
        }
      }
    
      Logout(){
        localStorage.removeItem('token');
        this.loginStatus.emit(false);
      }

}