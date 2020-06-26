import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { MarkdownComponent } from './test-components/markdown/markdown.component';
import { ProfileComponent } from './profile/profile.component';
import { SendsComponent } from './sends/sends.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/login.guard';
import { RegisterComponent } from './register/register.component';
import { AuthDeGuard } from './guards/login.deguard';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemDetailComponent } from './problem/problem-detail/problem-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { PostListComponent } from './forum/post-list/post-list.component';
import { CourseOutletComponent } from './course/course-outlet/course-outlet.component';
import { CourseComponent } from './course/course-list/course.component';
import { SectionComponent } from './course/section/section.component';
import { PostComponent } from './forum/post/post.component';
import { ContestOutletComponent } from './contest/contest-outlet/contest-outlet.component';


const routes: Routes = [
  { path: '',  component: TestComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthDeGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthDeGuard]},
  { path: 'markdown', component: MarkdownComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'sends', component: SendsComponent, canActivate: [AuthGuard]},
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard]},
  { path: 'course/:id', component: CourseOutletComponent, canActivate: [AuthGuard],
     children: [
       {path: '', component: CourseComponent},
       {path: 'section/:id', component: SectionComponent},
       {path: 'forum', component: PostListComponent},
       {path: 'forum/:id', component: PostComponent},
    ]},
  { path: 'articles', component: ArticleListComponent},
  { path: 'article/:id', component: ArticleDetailComponent},
  { path: 'problems', component: ProblemListComponent},
  { path: 'problem/:id', component: ProblemDetailComponent},

  { path: 'contest/:id', component: ContestOutletComponent, canActivate: [AuthGuard],
  children: [
    {path: '', component: CourseComponent},
    {path: 'overview', component: SectionComponent},
    {path: 'problems/:id', component: PostListComponent},
    {path: 'status', component: PostComponent},
    {path: 'rank', component: PostComponent},
 ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

