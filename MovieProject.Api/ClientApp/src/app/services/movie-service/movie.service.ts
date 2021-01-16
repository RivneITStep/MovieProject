import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/Models/result.model';
import { MovieModel } from './../../Models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieAddModel } from 'src/app/Models/movieadd.model';
import { MovieEditModel } from 'src/app/Models/movieedit.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/movie';

  getAllMovies(){
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

  getMovie(id: number){
    return this.http.get(this.baseUrl + '/' + id);
  }

  editMovie(model: MovieEditModel){
    return this.http.post<ApiResult>(this.baseUrl + '/edit', model);
  }

  addMovie(model: MovieAddModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  deleteMovie(id: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/' + id);
  }

  getMovieActors(id: number){
    return this.http.get(this.baseUrl + '/' + id + '/actors');
  }

}
