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

    tags.forEach(tag => { tagsID.push(tag.id); });

    const body = new HttpParams()
    .set("title", article.title)
    .set("author", article.author)
    .set("markdownURL", article.markdown)
    .set("dateWritten", article.dateWritten + "")
    .set("tags", tagsID.toString());

    //console.log("HEE HEE ");  
    return this.http.post(environment.urlCreateArticle, body, {responseType: 'text'});
  }

  editArticle(article: Article, tags: Tag[]){
    let tagsID = Array<number>();

    tags.forEach(tag => { tagsID.push(tag.id); });
    
    const body = new HttpParams()
    .set("title", article.title)
    .set("author", article.author)
    .set("markdownURL", article.markdown)
    .set("dateWritten", article.dateWritten + "")
    .set("tags", tagsID.toString())
    .set("id", article.id + "");    


    //console.log("HEE HEE ");  
      return this.http.post(environment.urlUpdateArticle, body, {responseType: 'text'});
  }

  deleteArticle(article: Article){
    const body = new HttpParams()
    .set("id", article.id + "");    
    //console.log("HEE HEE ");  
      return this.http.post(environment.urlDeleteArticle, body, {responseType: 'text'});
  }
}
