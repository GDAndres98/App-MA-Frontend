import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contest, ContestStats, Scoreboard, ContestPreview } from 'src/app/model/contest';
import { environment } from 'src/environments/environment.prod';
import { Problem } from 'src/app/model/problem';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private http: HttpClient) { }

  getContestAdmin(id: number): Observable<Contest> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<Contest>(environment.urlGetContestAdminById, op);
  }

  getContestById(id: number, password: string): Observable<ContestStats> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '', 'password': password})
    };
    return this.http.get<ContestStats>(environment.urlGetContestById, op);
  }

  getContestPreviewById(id: number): Observable<ContestPreview> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<ContestPreview>(environment.urlGetContestPreviewById, op);
  }

  getAllProblemsFromContest(id: number): Observable<Problem[]> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<any>(environment.urlGetAllProblemsFromContest, op);
  }

  getScoreboard(id: number): Observable<Scoreboard> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<Scoreboard>(environment.urlGetScoreboard, op);
  }

  getRunningContests(): Observable<ContestPreview[]> {
    return this.http.get<ContestPreview[]>(environment.urlGetRunningContests);
  }

  getFutureContests(): Observable<ContestPreview[]> {
    return this.http.get<ContestPreview[]>(environment.urlGetFutureContests);
  }

  getPastContests(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '' })
    };
    return this.http.get<any>(environment.urlGetPastContests, op);
  }

  getSolvedProblems(contestId: number, userId: number, problemsId: number[]=[]) : Observable<any> {
    const op = {
      headers: new HttpHeaders({ 'contestId': contestId + '', 'userId': userId + '', 'problemsId': problemsId + '' })
    };
    return this.http.get<any>(environment.urlGetSolvedProblems, op);
  }

}
