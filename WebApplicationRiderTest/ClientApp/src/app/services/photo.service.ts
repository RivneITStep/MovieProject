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
  baseUrl = '/api/photo';
  
  addActorPhoto(model: PhotoAddModel){
    return this.http.post<ApiResult>(this.baseUrl + '/actor', model);
  }

  getActorPhoto(model: PhotoAddModel): Observable<PhotoModel>{
    return this.http.get<PhotoModel>(this.baseUrl + '/actor/' + model.actorId);
  }

}
