import { NgModule } from '@angular/core';
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
import { ContestOverviewComponent } from './contest/contest-overview/contest-overview.component';
import { ContestProblemsComponent } from './contest/contest-problems/contest-problems.component';
import { ContestStatusComponent } from './contest/contest-status/contest-status.component';
import { ContestScoreboardComponent } from './contest/contest-scoreboard/contest-scoreboard.component';
import { ProblemEmbeddedComponent } from './problem/problem-embedded/problem-embedded.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDeGuard } from './guards/admin.deguard';
import { AdminGuard } from './guards/admin.guard';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminArticleComponent } from './admin/admin-article/admin-article.component';
import { AdminProblemComponent } from './admin/admin-problem/admin-problem.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { AdminContestComponent } from './admin/admin-contest/admin-contest.component';


const routes: Routes = [
  { path: 'test', component: ProblemEmbeddedComponent },
  { path: '', component: TestComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthDeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthDeGuard] },
  { path: 'markdown', component: MarkdownComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'sends', component: SendsComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] },
  {
    path: 'course/:id', component: CourseOutletComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: CourseComponent },
      { path: 'section/:id', component: SectionComponent },
      { path: 'forum', component: PostListComponent },
      { path: 'forum/:id', component: PostComponent },
    ]
  },
  { path: 'articles', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'problems', component: ProblemListComponent },
  { path: 'problem/:id', component: ProblemDetailComponent },

  {
    path: 'contest/:id', component: ContestOutletComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: ContestOverviewComponent },
      { path: 'overview', component: ContestOverviewComponent },
      { path: 'problems', component: ContestProblemsComponent },
      { path: 'status', component: ContestStatusComponent },
      { path: 'scoreboard', component: ContestScoreboardComponent },
    ]
  },
  {path: 'admin-login', component: AdminLoginComponent, canActivate: [AdminDeGuard]},
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminMenuComponent},
      { path: 'articles', component: AdminArticleComponent},
      { path: 'problems', component: AdminProblemComponent},
      { path: 'courses',  component: AdminCoursesComponent},
      { path: 'contest',  component: AdminContestComponent},

    ]
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

