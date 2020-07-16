import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level, Stage } from 'src/app/model/level';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }


  getAllStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(environment.urlGetAllStages);
  }

  getAllLevelsByStage(id: number): Observable<Level[]> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<Level[]>(environment.urlGetAllLevelsByStage, op);
  }

  getLevelById(id: number): Observable<Level> {
    let op = {
      headers: new HttpHeaders({ 'id': id + '' })
    };
    return this.http.get<Level>(environment.urlGetLevelById, op);
  }




}
