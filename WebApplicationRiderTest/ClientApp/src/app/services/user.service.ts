import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { ApiResult } from '../models/result.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/usermanager';

  getUser(id: string){
    return this.http.get(this.baseUrl + '/' + id);
  }

  getUsers(){
    return this.http.get(this.baseUrl);
  }

  addUserMovie(id: string, movieId: number){
    return this.http.post<ApiResult>(this.baseUrl + '/' + id + '/movies/' + movieId, null);
  }
  
  getUserMovies(id: string): Observable<MovieModel[]>{
    return this.http.get<MovieModel[]>(this.baseUrl + '/' + id + '/movies');
  }

  deleteUserMovie(id: string, movieId: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/' + id + '/movies/' + movieId);
  }

  editUser(id: string, model: UserModel){
    return this.http.post<ApiResult>(this.baseUrl + '/editUser/' + id, model);
  }

}
