import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { MarkdownComponent } from './test-components/markdown/markdown.component';
import { ProfileComponent } from './profile/profile.component';
import { SendsComponent } from './sends/sends.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/login.guard';
import { ArticlesComponent } from './test-components/articles/articles.component';
import { RegisterComponent } from './register/register.component';
import { AuthDeGuard } from './login/login.deguard';


const routes: Routes = [
  { path: '',  component: TestComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthDeGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthDeGuard]},
  { path: 'markdown', component: MarkdownComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'sends', component: SendsComponent, canActivate: [AuthGuard]},
  { path: 'articles', component: ArticlesComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

