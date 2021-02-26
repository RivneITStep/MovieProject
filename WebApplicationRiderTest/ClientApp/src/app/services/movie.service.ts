import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActorModel } from '../models/actor.model';
import { MovieAddModel } from '../models/movie-add.model';
import { MovieModel } from '../models/movie.model';
import { ApiResult } from '../models/result.model';
import { VideoModel } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/movie';

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

  deleteMovieActor(id: number, actorId: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/' + id + '/' + actorId);
  }

  getMovieActors(id: number): Observable<ActorModel[]>{
    return this.http.get<ActorModel[]>(this.baseUrl + '/actors/' + id);
  }

  getMovieAvailableActors(id: number): Observable<ActorModel[]>{
    return this.http.get<ActorModel[]>(this.baseUrl + '/' + id + '/actors/available');
  }

  rateMovie(id: number, mark: number){
    return this.http.post<ApiResult>(this.baseUrl + '/rate/' + id + '/' + mark, null);
  }

  getFilterList(filter: string){
    return this.http.get<string[]>(this.baseUrl + '/filter/' + filter);
  }

  getMovieVideo(id: number){
    return this.http.get<VideoModel>(this.baseUrl + '/' + id + '/video');
  }

}
