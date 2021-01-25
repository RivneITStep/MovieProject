import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/result.model';
import { Observable } from 'rxjs';
import { ActorModel } from 'src/app/models/actor/actor.model';
import { ActorAddModel } from 'src/app/models/actor/actor-add.model';
import { MovieModel } from 'src/app/models/movie/movie.model';

@Injectable({
  providedIn: 'root'
})

export class ActorService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/actor';
  
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
    return this.http.get<MovieModel[]>(this.baseUrl + '/movies');
  }

}
