import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { UserService } from '../services/user.service';
import jwt_decode from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { ApiResult } from '../models/result.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: string;
  user: UserModel = new UserModel();
  file: any;

  constructor(private sanitizer: DomSanitizer, private userService: UserService, private apiService: ApiService) { }

  onFileChanged(event) {
    this.file = event.target.files[0];
    let form = new FormData();
    form.append('file', this.file, this.file.name);
    this.userService.addUserImg(this.id, form).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          console.log('Success');
          this.userService.getUser(this.id).subscribe(
            (data: UserModel) => {
              this.user = data;
            }
          );
        } else {
          console.log('Error');
        }
      }
    );

  }

  getUserImg() {
    if (this.user.pictureUrl == null) {
      return 'https://uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg';
    }
    return '/Images/' + this.user.pictureUrl;
  }


  ngOnInit() {
    this.id = (jwt_decode(localStorage.getItem('token')) as UserModel).id;
    this.userService.getUser(this.id).subscribe(
      (data: UserModel) => {
        this.user = data;
      }
    );

  }

}
