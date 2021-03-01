import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoModel } from '../models/photo.model';
import { PhotoAddModel } from '../models/photoadd.model';
import { ApiResult } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/actor';
  
  addActorPhoto(model: PhotoAddModel){
    return this.http.post<ApiResult>(this.baseUrl + '/photos/' + model.actorId, model);
  }

  getActorPhotos(id: number): Observable<PhotoModel[]>{
    return this.http.get<PhotoModel[]>(this.baseUrl + '/photos/' + id);
  }

  deleteActorPhoto(id: number, photoId: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/photos/' + id + '/' + photoId);
  }

}
