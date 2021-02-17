import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginModel } from '../models/login.model';
import { Result } from '../models/result.model';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) { }

  user: LoginModel = new LoginModel();

  login(){
    if(this.user.email == '' || this.user.password == ''){
      alert('Please enter data');
    }else{
      this.authService.login(this.user).subscribe(
        (data: Result) => {
          if(data.status == 200){
            localStorage.setItem('token', data.token);
            this.messageService.add({severity:'success', summary:'Notify', detail:'Succesfuly authorised'});
            this.router.navigate(['/cinema']);
          }else{
            
          }
        }
      );
    }
  }

  ngOnInit() {
  }

}
