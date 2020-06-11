import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/model/tag';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.urlGetAllTags);
  }

}
