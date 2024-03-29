import { Injectable } from '@angular/core';
import { Article } from 'src/app/model/article';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from 'src/app/model/tag';
import { environment } from 'src/environments/environment';
import { Problem } from 'src/app/model/problem';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { Contest } from 'src/app/model/contest';
import { LoginComponent } from 'src/app/login/login.component';
import { TestCase } from 'src/app/model/test-case';

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

  createProblem(problem: Problem, tags: Tag[]){
    let tagsID = Array<number>();

    tags.forEach(tag => { tagsID.push(tag.id); });

    const body = new HttpParams()
    .set("title",       problem.title)
    .set("author",      problem.author)
    .set("markdownURL", problem.markdown)
    .set("timeLimit",   problem.timeLimit + "")
    .set("memoryLimit", problem.memoryLimit + "")
    .set("tags",        tagsID.toString());

    //console.log("HEE HEE ");  
    return this.http.post(environment.urlCreateProblem, body, {responseType: 'text'});
  }

  editProblem(problem: Problem, tags: Tag[]){
    let tagsID = Array<number>();

    tags.forEach(tag => { tagsID.push(tag.id); });
    
    const body = new HttpParams()
    .set("id",          problem.id + "")
    .set("title",       problem.title)
    .set("author",      problem.author)
    .set("markdownURL", problem.markdown)
    .set("timeLimit",   problem.timeLimit + "")
    .set("memoryLimit", problem.memoryLimit + "")
    .set("tags",        tagsID.toString());  


    //console.log("HEE HEE ");  
      return this.http.post(environment.urlUpdateProblem, body, {responseType: 'text'});
  }

  deleteProblem(problem: Problem){
    const body = new HttpParams()
    .set("problemId", problem.id + "");    
    //console.log("HEE HEE ");  
      return this.http.post(environment.urlDeleteProblem, body, {responseType: 'text'});
  }

  getProfesorById(id: number): Observable<User> {
    const op = {
      headers: new HttpHeaders({ 'id': id + ""})
    };

    return this.http.get<User>(environment.urlGetProfesorById, op);
  }

  createCourse(name: string, logo: string, professor: User){
    const body = new HttpParams()
    .set("name",        name)
    .set("image",       logo)
    .set("professorId", professor.id + "" );
    return this.http.post(environment.urlCreateCourse, body, {responseType: 'text'});
  }

  updateCourse(name: string, logo: string, professor: User, courseId: number){
    const body = new HttpParams()
    .set("name",        name)
    .set("image",       logo)
    .set("professorId", professor.id + "" )
    .set("courseId",    courseId + "" );
    return this.http.post(environment.urlUpdateCourse, body, {responseType: 'text'});
  }

  addStudentToCourse(studentId: number, courseId: number){
    const body = new HttpParams()
    .set("studentId",  studentId +"")
    .set("courseId",   courseId + "");

    return this.http.post(environment.urlAddStudentToCourse, body, {responseType: 'text'});
  }

  removeStudentToCourse(studentId: number, courseId: number){
    const body = new HttpParams()
    .set("studentId",  studentId +"")
    .set("courseId",   courseId + "");

    return this.http.post(environment.urlRemoveStudentToCourse, body, {responseType: 'text'});
  }

  createContest(contest: Contest, password: string, problems: Problem[]){
    let map: number[] = [];
    problems.forEach(element => {
      map.push(element.id);
    });

    console.log("HEHEHEHEHEHEHEHE");
    
    
    const body = new HttpParams()
    .set("name",        contest.name + "")
    .set("isPrivate",   contest.private + "")
    .set("password",    password)
    .set("startTime",   contest.startTime + "")
    .set("endTime",     contest.endTime + "")
    .set("problems",    map.toString());
    return this.http.post(environment.urlCreateContest, body, {responseType: 'text'});
  }

  editContest(contest: Contest, password: string, problems: Problem[]){
    let map: number[] = [];
    problems.forEach(element => {
      map.push(element.id);
    });
    
    const body = new HttpParams()
    .set("id",          contest.id + "")
    .set("name",        contest.name + "")
    .set("isPrivate",   contest.private + "")
    .set("password",    password)
    .set("startTime",   contest.startTime + "")
    .set("endTime",     contest.endTime + "")
    .set("problems",    map.toString());
    return this.http.post(environment.urlEditContest, body, {responseType: 'text'});
  }

  setTestCases(problemId: number, testCases: TestCase[]){
    let input: String[] = [];
    let output: String[] = [];
    let dificulty: number[] = [];

    testCases.forEach(v =>{
      input.push(v.tcInputURL);
      output.push(v.tcOutputURL);
      dificulty.push(v.tcDifficulty);
    });
    
    const body = new HttpParams()
    .set("problemId",   problemId + "")
    .set("input",       input.toString())
    .set("output",      output.toString())
    .set("dificulty",   dificulty.toString());
    return this.http.post(environment.urlSetTestCases, body, {responseType: 'text'});
  }

  
  deleteContest(idContest: number){
    const body = new HttpParams()
    .set("id", idContest + "");    
    //console.log("HEE HEE ");  
      return this.http.post(environment.urlDeleteContest, body, {responseType: 'text'});
  }
  
  
  getUser(userId: number): Observable<User>{    
    const op = {
      headers: new HttpHeaders({ 'id': userId + ""})
    };

    return this.http.get<User>(environment.urlGetUserById, op);
  }
  
  setProfesorRole(userId: number, isProfesor: boolean){
    const body = new HttpParams()
    .set("userId", userId + "")    
    .set("isProfesor", isProfesor + "");    
    //console.log("HEE HEE ");  
      return this.http.post(environment.urlSetProfesorRole, body, {responseType: 'text'});
  }


}
