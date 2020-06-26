import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Language } from 'src/app/model/submit';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {


  constructor(    
    private http: HttpClient,) { }

  submit(userId: number, contestId: number, problemId: number, source: string, languague: Language){
    const body = new HttpParams()
    .set("idUser", userId+"")
    .set("idContest", contestId+"")
    .set("idProblem", problemId+"")
    .set("source", source)
    .set("language", Language[languague]+"");

    //console.log("HEE HEE ");  
    return this.http.post(environment.urlSubmit, body, {responseType: 'text'});
  }

}
