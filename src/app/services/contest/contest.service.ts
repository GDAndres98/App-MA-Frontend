import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contest, ContestStats, Scoreboard } from 'src/app/model/contest';
import { environment } from 'src/environments/environment';
import { Problem } from 'src/app/model/problem';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private http: HttpClient) { }

  getContestById(id: number): Observable<ContestStats> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<ContestStats>(environment.urlGetContestById, op);
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

  getRunningContests(): Observable<Contest[]> {
    return this.http.get<Contest[]>(environment.urlGetRunningContests);
  }

  getFutureContests(): Observable<Contest[]> {
    return this.http.get<Contest[]>(environment.urlGetFutureContests);
  }

  getPastContests(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 'pageNo': pageNo + '', 'pageSize': pageSize + '', 'sortBy': sortBy + '' })
    };
    return this.http.get<any>(environment.urlGetPastContests, op);
  }

}
