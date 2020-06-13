import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from 'src/app/model/article';
import { Tag } from 'src/app/model/tag';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.urlGetAllArticles);
  }

  getAllArticlesPagination(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '' })
    };
    return this.http.get<any>(environment.urlGetAllArticlesPagination, op);
  }

  getArticleById(id: number): Observable<Article> {
    const op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<Article>(environment.urlGetArticleById, op);
  }

  searchArticle(prefix: string): Observable<Article[]> {
    const op = {
      headers: new HttpHeaders({ 'prefix': prefix })
    };

    return this.http.get<Article[]>(environment.urlGetSearchArticle, op);
  }


  getArticlesWithTags(pageNo: number, pageSize: number, sortBy: string, tags: Tag[]): Observable<any> {
    let tagsID = Array<number>();
    tags.forEach(tag => { tagsID.push(tag.id); });
    console.log("SERVICIO:");
    console.log(tags);
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '', 'tagsID': tagsID.toString() })
    };
    return this.http.get<any>(environment.urldGetArticlesWithTags, op);
  }




}
