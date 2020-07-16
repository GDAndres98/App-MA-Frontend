import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Language, Submit } from 'src/app/model/submit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {



  constructor(    
    private http: HttpClient,) {

     }

  submit(userId: number, contestId: number, problemId: number, source: string, languague: Language){
    let sl = (Object.keys(Language).find(key => Language[key] === languague));

    const body = new HttpParams()
    .set("idUser", userId+"")
    .set("idContest", contestId+"")
    .set("idProblem", problemId+"")
    .set("source", source)
    .set("language", sl);
    

    //console.log("HEE HEE ");  
    return this.http.post(environment.urlSubmit, body, {responseType: 'text'});
  }

  getUserSubmitPage(pageNo: number, pageSize: number, sortBy: string, ascending : boolean = true, userId: number): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 
      'pageNo': pageNo + '',
      'pageSize': pageSize + '', 
      'sortBy': sortBy + '',
      'ascending': ascending + '',
      'userId': userId + ''})
    };
    return this.http.get<any>(environment.urlGetUserSubmit, op);
  }

  getSubmitsByUserContest(pageNo: number, pageSize: number, sortBy: string, ascending : boolean = true, userId: number, contestId: number): Observable<any> {
    const op = {
      headers: new HttpHeaders({ 
      'pageNo': pageNo + '',
      'pageSize': pageSize + '', 
      'sortBy': sortBy + '',
      'ascending': ascending + '',
      'userId': userId + '',
      'contestId': contestId + ''})
    };
    console.log(op);
    return this.http.get<any>(environment.urlGetSubmitsByUserContest, op);
  }
  getAllSubmits(): Observable<Submit[]> {
    return this.http.get<Submit[]>(environment.urlGetAllSubmits);
  }

  getContestSubmitPage(pageNo: number, pageSize: number, sortBy: string, ascending: boolean, contestId: number): Observable<any> {
    const op = {
      headers: new HttpHeaders({
        'pageNo': pageNo + '',
        'pageSize': pageSize + '',
        'sortBy': sortBy + '',
        'ascending': ascending + '',
        'contestId': contestId + ''
      })
    };
    return this.http.get<any>(environment.urlGetContestSubmits, op);
  }



  getSourceCode(submitId: number){
    const op = {
      headers: new HttpHeaders({'submitId': submitId + ''}),
      responseType: 'text' as 'text',
    };
    return this.http.get(environment.urlGetSourceCode,  op);
  }

  getLastProblemAttempt(userId: number, contestId: number, problemId: number): Observable<Submit[]>{
    const op = {
      headers: new HttpHeaders(
        {
          'userId': userId + '',
          'contestId': contestId + '',
          'problemId': problemId + ''
      })
    };
    return this.http.get<Submit[]>(environment.utlGetLastProblemAttempt, op);
  }

  getLastSubmitAttempt(userId: number, contestId: number, problemId: number): Observable<Submit>{
    const op = {
      headers: new HttpHeaders(
        {
          'userId': userId + '',
          'contestId': contestId + '',
          'problemId': problemId + ''
      })
    };
    return this.http.get<Submit>(environment.urlGetLastSubmitAttempt, op);
  }


}
