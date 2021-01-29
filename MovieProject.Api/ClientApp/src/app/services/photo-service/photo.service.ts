import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoModel } from 'src/app/models/photo.model';
import { PhotoAddModel } from 'src/app/models/photoadd.model';
import { ApiResult } from 'src/app/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/photo';
  
  addActorPhoto(model: PhotoAddModel){
    return this.http.post<ApiResult>(this.baseUrl + '/actor', model);
  }

  getActorPhoto(model: PhotoAddModel): Observable<PhotoModel>{
    return this.http.get<PhotoModel>(this.baseUrl + '/actor/' + model.actorId);
  }

}
