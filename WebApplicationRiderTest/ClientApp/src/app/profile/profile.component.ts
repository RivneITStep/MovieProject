import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { UserService } from '../services/user.service';
import jwt_decode from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { ApiResult } from '../models/result.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { MarkModel } from '../models/mark.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: string;
  user: UserModel = new UserModel();
  favMovies: MovieModel[] = [];
  userMarks: MarkModel[] = [];
  file: any;
  data: any;

  constructor(private router: Router, private movieService: MovieService, private messageService: MessageService, private sanitizer: DomSanitizer, private userService: UserService, private apiService: ApiService) {}

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

  redirect(id: number){
    this.router.navigate(['movies/' + id]);
  }

  editUser(){
    this.userService.editUser(this.id, this.user).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Profile edited' });
        }else{
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
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
    this.userService.getUserMovies(this.id).subscribe(
      (data: MovieModel[]) => {
        this.favMovies = data;
      }
    );
    this.userService.getUserMarks(this.id).subscribe(
      (data: MarkModel[]) => {
        this.userMarks = data;
      }
    );
  }

}
