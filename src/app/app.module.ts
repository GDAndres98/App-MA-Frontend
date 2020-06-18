import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { TestComponent } from './test/test.component';
import { MarkdownComponent } from './test-components/markdown/markdown.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { MarkdownModule, KatexOptions } from 'ngx-markdown';
import { ProfileComponent } from './profile/profile.component';
import { SendsComponent } from './sends/sends.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/login.guard';
import { StorageService } from './services/auth/storage.service';
import { RegisterComponent } from './register/register.component';
import { AuthDeGuard } from './guards/login.deguard';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleItemComponent } from './article/article-item/article-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProblemListComponent } from './problem/problem-list/problem-list.component';
import { ProblemDetailComponent } from './problem/problem-detail/problem-detail.component';
import { StringShorter } from './article/article-list/stringShorterPipe';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course-list/course.component';
import { RouterModule } from '@angular/router';
import { SectionItemComponent } from './course/section-item/section-item.component';
import { PostListComponent } from './forum/post-list/post-list.component';
import { BauraComponent } from './test/basura/baura/baura.component';
import { DialogArticleComponent } from './course/dialog-article/dialog-article.component';
import { CourseOutletComponent } from './course/course-outlet/course-outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MarkdownComponent,
    ProfileComponent,
    SendsComponent,
    LoginComponent,
    SidebarComponent,
    ArticleItemComponent,
    RegisterComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    StringShorter,
    CourseListComponent,
    CourseComponent,
    SectionItemComponent,
    DialogArticleComponent,
    PostListComponent,
    BauraComponent,
    CourseOutletComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    NgbModule,
  ],
  exports:[],
  providers: [AuthService, AuthGuard, StorageService, AuthDeGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogArticleComponent
],
})
export class AppModule { }
