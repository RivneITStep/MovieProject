import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/models/result.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from 'src/app/models/movie/movie.model';
import { MovieAddModel } from 'src/app/models/movie/movie-add.model'
import { ActorModel } from 'src/app/models/actor/actor.model';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/movie';

  getMovies(){
    return this.http.get(this.baseUrl);
  }

  getMovie(id: number): Observable<MovieModel>{
    return this.http.get<MovieModel>(this.baseUrl + '/' + id);
  }

  editMovie(model: MovieModel){
    return this.http.post<ApiResult>(this.baseUrl + '/edit', model);
  }

  addMovie(model: MovieAddModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  deleteMovie(id: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/' + id);
  }

  addMovieActor(id: number, actorId: number){
    return this.http.post<ApiResult>(this.baseUrl + '/' + id + '/' + actorId, null);
  }

  getMovieActors(id: number): Observable<ActorModel[]>{
    return this.http.get<ActorModel[]>(this.baseUrl + '/actors/' + id);
  }

  rateMovie(id: number, mark: number){
    return this.http.post<ApiResult>(this.baseUrl + '/rate/' + id + '/' + mark, null);
  }

  getFilterList(filter: string){
    return this.http.get<string[]>(this.baseUrl + '/filter/' + filter);
  }

}
