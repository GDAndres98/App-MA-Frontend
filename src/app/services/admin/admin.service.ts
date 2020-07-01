import { Injectable } from '@angular/core';
import { Article } from 'src/app/model/article';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Tag } from 'src/app/model/tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  createArticle(article: Article, tags: Tag[]){
    let tagsID = Array<number>();

    const body = new HttpParams()
    .set("title", article.title)
    .set("author", article.author)
    .set("markdownURL", article.markdown)
    .set("dateWritten", article.dateWritten + "");

    //console.log("HEE HEE ");  
    return this.http.post(environment.urlCreateArticle, body, {responseType: 'text'});
  }
}
