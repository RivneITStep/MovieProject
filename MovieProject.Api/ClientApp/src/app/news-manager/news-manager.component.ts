import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleModel } from '../Models/article.model';
import { ApiResult } from '../Models/result.model';
import { ArticleService } from '../services/article-service/article.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.css']
})
export class NewsManagerComponent implements OnInit {

  constructor(private notifier: NotifierService, private articleService: ArticleService, private spinner: NgxSpinnerService) { }

  article: ArticleModel = new ArticleModel();
  list: ArticleModel[] = [];
  isError: boolean = false;

  postNews() {
    this.spinner.show();
    this.article.id = 0;
    const token = localStorage.getItem('token');

    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);

    this.article.userId = decodedJwtData.id;
    if (this.article.title === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter title');
    }
    if (this.article.text === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter text');
    }
    if (this.article.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter pictureUrl');
    }

    if(this.isError == false) {
      this.articleService.addArticle(this.article).subscribe(
        (data: ApiResult) => {
          if(data.status == 200){
            this.notifier.notify('success', 'Article added');
          }else{
            this.notifier.notify('error','Article not added');
          }
        }
      );
    }
    this.isError = false;
    this.article.id = null;
    this.article.title = null;
    this.article.text = null;
    this.article.pictureUrl = null;
    this.article.userId = null;
    this.spinner.hide();
    window.location.reload();
  }

  deleteNews(id: number){
    this.articleService.deleteArticle(id).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.notifier.notify('success', 'Article deleted');
        }else{
          this.notifier.notify('error','Article not deleted');
        }
      }
    );
    window.location.reload();
  }

  ngOnInit() {
    this.articleService.getAllArticles().subscribe(
      (data: ArticleModel[]) => {
        this.list = data;
        console.log(this.list[0].title);
      }
    );

    this.article.id = null;
    this.article.title = null;
    this.article.text = null;
    this.article.pictureUrl = null;
    this.article.userId = null;
  }

}
