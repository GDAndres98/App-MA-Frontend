import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from 'src/app/model/article';

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

  searchArticle(prefix: string): Observable<Article[]>{
    const op = {
      headers: new HttpHeaders({ 'prefix': prefix})
    };  
    
    return this.http.get<Article[]>(environment.urlGetSearchArticle, op);
  }





}
