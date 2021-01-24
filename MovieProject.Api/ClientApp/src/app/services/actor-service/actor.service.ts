import { ActorModel } from '../../models/actor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/models/result.model';
import { ActorAddModel } from 'src/app/models/actoradd.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/actor';
  
  getActor(id: number): Observable<ActorModel>{
    return this.http.get<ActorModel>(this.baseUrl + '/' + id);
  }

  getActors(){
    return this.http.get<ActorModel>(this.baseUrl);
  }

  addActor(model: ActorAddModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  editActor(model: ActorModel){
    return this.http.post<ApiResult>(this.baseUrl + '/' + 'edit', model);
  }

  deleteActor(id: number){
    return this.http.delete<ApiResult>(this.baseUrl);
  }

}
