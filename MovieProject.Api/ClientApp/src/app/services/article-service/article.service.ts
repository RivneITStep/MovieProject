import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ApiResult } from 'src/app/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/article';

  getAllArticles(){
    return this.http.get(this.baseUrl);
  }

  getArticle(id: number){
    return this.http.get(this.baseUrl + '/' + id);
  }

  addArticle(model: ArticleModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  deleteArticle(id: number){
    return this.http.delete(this.baseUrl + '/' + id);
  }

}
