import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/Models/result.model';
import { MovieModel } from './../../Models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/movie';
  Movies: MovieModel[] = [];

  getAllMovies(){
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

  getMovie(id: number){
    return this.http.get(this.baseUrl + '/' + id);
  }

  addMovie(model: MovieModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

}
