import { Injectable } from '@angular/core';
import { Course } from 'src/app/model/course';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/User';
import { Section } from 'src/app/model/section';
import { Post, PostToSubmit } from 'src/app/model/post';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Array<Course> = [];
  coursesProfesor: Array<Course> = [];
  courseIn:   BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  courseOwn:  BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  constructor(private http: HttpClient) { }


  getUserCourses(id: number): void {
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };

    this.http.get<Course[]>(environment.urlGetUserCourses, op).subscribe(data => {
      this.courses = data;

      let map: Map<Number, User> = new Map();
      this.courses.forEach((v, index) => {
        if (typeof v.professor == 'number')
          this.courses[index].professor = map.get(v.professor);
        else
          map.set(v.professor.id, v.professor);
      });
      this.courseIn.next(this.courses);
    });
  }

  getProfesorCourses(id: number): void {
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };

    this.http.get<Course[]>(environment.urlGetProfesorCourses, op).subscribe(data => {
      this.coursesProfesor = data;

      let map: Map<Number, User> = new Map();
      this.coursesProfesor.forEach((v, index) => {
        if (typeof v.professor == 'number')
          this.coursesProfesor[index].professor = map.get(v.professor);
        else
          map.set(v.professor.id, v.professor);
      });

      this.courseOwn.next(this.coursesProfesor);
    });
  }

  clearCourses(): void {
    this.courses = [];
    this.courseIn.next([]);
    this.coursesProfesor = [];
    this.courseOwn.next([]);
  }

  hasCourse(id: number): boolean {
    return this.courses.find(v => v.id == id) !== undefined;
  }

  getCourse(id: number): Course {
    return this.courses.find(v => v.id == id);
  }

  getSectionFromCourse(id: number): Observable<Section[]> {
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };
    return this.http.get<Section[]>(environment.urlGetSectionFromCourse, op);
  }

  getSectionById(id: number): Observable<Section> {
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };
    return this.http.get<Section>(environment.urlGetSectionById, op);
  }

  getPostById(id: number): Observable<Post> {
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };
    return this.http.get<Post>(environment.urlGetPostById, op);
  }

  getPostsFromCourse(id: number, pageNo: number, pageSize: number): Observable<any> {
    const op = { headers: new HttpHeaders({ 'id': id + '', 'pageNo': pageNo + '', 'pageSize': pageSize + '' }) };
    return this.http.get<any>(environment.urlGetPostsFromCourse, op);
  }

  getSubPostFromPost(id: number, pageNo: number, pageSize: number): Observable<any> {
    const op = { headers: new HttpHeaders({ 'id': id + '', 'pageNo': pageNo + '', 'pageSize': pageSize + '' }) };
    return this.http.get<any>(environment.urlGetSubPostFromPost, op);
  }

  createPost(post: PostToSubmit) {
    const body = new HttpParams()
      .set("userId", post.studentId.toString())
      .set("courseId", post.courseId.toString())
      .set("title", post.title.trim())
      .set("content", post.content.trim());

    return this.http.post(environment.urlCreatePost, body, { responseType: 'text' });
  }

  createSubPost(post: PostToSubmit) {
    const body = new HttpParams()
      .set("postId", post.postId.toString())
      .set("userId", post.studentId.toString())
      .set("courseId", post.courseId.toString())
      .set("content", post.content.trim());

    return this.http.post(environment.urlCreateSubPost, body, { responseType: 'text' });
  }

  getCourseById(id: number): Observable<Course>{    
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };
    return this.http.get<Course>(environment.urlGetCourseById, op);
  }

  getStudentsByCourseId(id: number): Observable<User[]>{
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };
    return this.http.get<User[]>(environment.urlGetStudentsCourse, op);
  }

  getStudentsById(id: number): Observable<User>{
    const op = { headers: new HttpHeaders({ 'id': id + '' }) };
    return this.http.get<User>(environment.urlGetStudentsById, op);
  }
  hasCoursePermision(courseId: number, userId: number): Observable<boolean>{
    const op = { headers: new HttpHeaders(
      { 'courseId': courseId + '',
        'userId': userId + ""
      })};
      return this.http.get<boolean>(environment.urlHasCoursePermision, op);
  }
  
  createSection(section: Section, courseId: number): Observable<Section>{
    const body = new HttpParams()
    .set("title",       section.title)
    .set("description", section.description)
    .set("order",       section.orderSection + "")
    .set("courseId",    courseId +"");
    return this.http.post<Section>(environment.urlCreateSection, body);
  }
  
  setOrderSection(ids: number[]){
    const body = new HttpParams()
    .set("ids", ids.toString());
    return this.http.post(environment.urlUpdateOrderSection, body, { responseType: 'text' });
    
  }
  
  editSection(section: Section): Observable<Section>{
    
    const body = new HttpParams()
    .set("id",          section.id + "")
    .set("title",       section.title)
    .set("description", section.description)
    .set("order",       section.orderSection + "");
      return this.http.post<Section>(environment.urlUpdateSection, body);
    }
    
    deleteSection(section: Section){
      const body = new HttpParams()
      .set("id",          section.id + "");
      return this.http.post(environment.urlDeleteSection, body, { responseType: 'text' });
    }
    
    addArticleToSection(sectionId: number, articleId: number){
      const body = new HttpParams()
      .set("articleId", articleId + "")
      .set("sectionId", sectionId + "");
      
      return this.http.post(environment.urlAddArticleToSection, body, { responseType: 'text' });
    } 
    
    removeArticleToSection(sectionId: number, articleId: number){
      const body = new HttpParams()
      .set("articleId", articleId + "")
      .set("sectionId", sectionId + "");
      
      return this.http.post(environment.urlRemoveArticleToSection, body, { responseType: 'text' });
    } 
    
    setSectionAttached(sectionId: number, attached: string){
      const body = new HttpParams()
      .set("id", sectionId + "")
      .set("attached", attached);
      
      return this.http.post(environment.urlSetSectionAttached, body, { responseType: 'text' });
    }
    
    
    addProblemToSection(sectionId: number, problemId: number){
      const body = new HttpParams()
      .set("problemId", problemId + "")
      .set("sectionId", sectionId + "");
      
      return this.http.post(environment.urlAddProblemToSection, body, { responseType: 'text' });
    } 
    
    removeProblemToSection(sectionId: number, problemId: number){
      const body = new HttpParams()
      .set("problemId", problemId + "")
      .set("sectionId", sectionId + "");
      
      return this.http.post(environment.urlRemoveProblemToSection, body, { responseType: 'text' });
    }
    
    getGradeFromStudent(userId: number, contestId: number, problemId: number){
      const op = { headers: new HttpHeaders(
        { 'userId'   : userId + '',
        'contestId': contestId + "",
        'problemId': problemId + "",
      })};
      return this.http.get<any>(environment.urlGetGradeFromStudent, op);
    }

    saveGrades(contestId: number, problemId: number, studentsId: number[], grades: number[]){
      const body = new HttpParams()
      .set("idContest",   contestId + "")
      .set("idProblem",   problemId + "")
      .set("studentsId",  studentsId.toString())
      .set("grades",      grades.toString());
      
      return this.http.post(environment.urlSaveGrades, body, { responseType: 'text' });
    }

    editHomework(contestId: number, problemId: number, limitDate: Date){
      const body = new HttpParams()
      .set("contestId",   contestId + "")
      .set("problemId",   problemId + "")
      .set("limitDate",   limitDate + "");
  
      return this.http.post(environment.urlEditHomework, body, {responseType: 'text'});
    }

    removeHomework(contestId: number, problemId: number){
      const body = new HttpParams()
      .set("contestId",   contestId + "")
      .set("problemId",   problemId + "");
  
      return this.http.post(environment.urlRemoveHomework, body, {responseType: 'text'});
    }
  }