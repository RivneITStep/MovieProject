import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../core/api.service';
import { LoginModel } from "../models/login.model";
import { ApiResult } from '../models/result.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private messageService: MessageService) { }

  user: LoginModel = new LoginModel();

  login(){
    if(this.user.email == null || this.user.password == null){
      this.messageService.add({severity:'error', summary:'Notify', detail:'Some fields are empty'});
    }else{
      this.apiService.SignIn(this.user).subscribe(
        (data: ApiResult) => {
          if(data.status == 200){
            localStorage.setItem('token', data.token);
            this.messageService.add({severity:'success', summary:'Notify', detail:'Succesfuly authorised'});
            this.router.navigate(['']);
          }else{
            this.messageService.add({severity:'error', summary:'Notify', detail:'Username or password is incorrect'});
          }
        }
      );
    }
  }

  ngOnInit() {
  }

}