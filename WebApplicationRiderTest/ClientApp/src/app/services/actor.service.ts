import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActorAddModel } from '../models/actor-add.model';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { ApiResult } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/actor';
  
  getActor(id: number): Observable<ActorModel>{
    return this.http.get<ActorModel>(this.baseUrl + '/' + id);
  }

  getActors(): Observable<ActorModel[]>{
    return this.http.get<ActorModel[]>(this.baseUrl);
  }

  addActor(model: ActorAddModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  editActor(model: ActorModel){
    return this.http.post<ApiResult>(this.baseUrl + '/' + 'edit', model);
  }

  deleteActor(id: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/' + id);
  }

  addActorMovies(id: number, movie_id: number){
    return this.http.post<ApiResult>(this.baseUrl + '/' + id + '/' + movie_id, null);
  }

  getActorMovies(id: number): Observable<MovieModel[]>{
    return this.http.get<MovieModel[]>(this.baseUrl + '/movies/' + id);
  }

  getFilterList(filter: string){
    return this.http.get<string[]>(this.baseUrl + '/filter/' + filter);
  }


}
