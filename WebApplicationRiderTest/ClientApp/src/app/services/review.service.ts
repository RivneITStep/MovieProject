import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../models/result.model';
import { ReviewAddModel } from '../models/review-add.model';
import { ReviewModel } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/review';
  
  addReview(model: ReviewAddModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  getMovieReviews(id: number): Observable<ReviewModel[]>{
    return this.http.get<ReviewModel[]>(this.baseUrl + '/movie/' + id);
  }

}
