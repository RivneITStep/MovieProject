import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../core/api.service';
import { ApiResult } from '../models/result.model';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private notifier: NotifierService, private apiService: ApiService, private userService: UserService) {
    this.isLoggedIn = apiService.isLoggedIn();
    if(this.isLoggedIn){
      const token = localStorage.getItem('token');
      if (token !== null) {
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        
        this.userService.getUser(decodedJwtData.id).subscribe(
          (data: UserModel) => {
            this.user = data;
          }
        );
        
      }
    }
  }

  isLoggedIn: boolean;
  user: UserModel = new UserModel();

  editUser(){
    this.userService.editUser(this.user.id, this.user).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          var userImg = document.getElementById("user-img") as HTMLImageElement;
          userImg.src = this.user.pictureUrl;
          this.notifier.notify('success','User edited');
        }else{
          this.notifier.notify('error','Server error');
        }
      }
    );
  }

  ngOnInit() {
  }

}
