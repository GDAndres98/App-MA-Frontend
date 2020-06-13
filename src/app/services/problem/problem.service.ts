import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Problem } from 'src/app/model/problem';
import { Tag } from 'src/app/model/tag';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient) { }


  getAllArticlesPagination(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '' })
    };
    return this.http.get<any>(environment.urlGetAllArticlesPagination, op);
  }

  getProblemById(id: number): Observable<Problem> {
    const op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<Problem>(environment.urlGetProblemById, op);
  }

  
  getAllProblemPagination(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '' })
    };
    return this.http.get<any>(environment.urlGetAllProblemPagination, op);
  }

  searchProblem(prefix: string): Observable<Problem[]>{
    const op = {
      headers: new HttpHeaders({ 'prefix': prefix})
    };  
    
    return this.http.get<Problem[]>(environment.urlGetSearchProblem, op);
  }

  getArticlesWithTags(pageNo: number, pageSize: number, sortBy: string, tags: Tag[]): Observable<any> {
    let tagsID = Array<number>();
    tags.forEach(tag => { tagsID.push(tag.id); });
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '', 'tagsId': tagsID.toString() })
    };
    return this.http.get<any>(environment.urldGetProblemsWithTags, op);
  }

}
