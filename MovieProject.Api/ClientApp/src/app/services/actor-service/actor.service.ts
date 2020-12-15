import { ActorModel } from './../../Models/actor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from 'src/app/Models/result.model';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/actor';
  
  getAllActor() {
    return this.http.get(this.baseUrl)
  }

  getActor(id: number){
    return this.http.get(this.baseUrl + '/get/' + id);
  }

  addActor(model : ActorModel){
    return this.http.post<ApiResult>(this.baseUrl + '/addactor/' , model);
  }
  
}
