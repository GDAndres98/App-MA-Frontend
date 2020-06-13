import { Component, OnInit } from '@angular/core';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { Problem } from 'src/app/model/problem';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Tag } from 'src/app/model/tag';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  allTags: Array<Tag>;
  filterForm: FormGroup;
  tagSearch: string;
  selectedTags: Array<Tag>;
  filteredTagsOptions: Array<Tag>;
  removable: boolean;
  filterControl = new FormControl();
  filteredByTags: boolean;
  expandedFilter: boolean;
  isLoadingFilter = false;

  problemsShowing: Array<Problem>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;

  myControl = new FormControl();
  form: FormGroup;
  search: string;

  isLoading = false;
  filteredProblems: Array<Problem> = new Array();

  constructor(
    private problemService: ProblemService,
    private tagService: TagService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.pageNo = 1;
    this.pageSize = 7;
    this.sortBy = "id";

    this.removable = true;
    this.filteredByTags = false;
    this.selectedTags = new Array();
    this.allTags = new Array();
    this.expandedFilter = false;

    this.problemsShowing = new Array();
    this.onPageChange();
    this.getAllTags();
  }

  onPageChange() {
    this.isLoadingFilter = true;
    if (this.filteredByTags) {
      this.problemService.getProblemsWithTags(this.pageNo - 1, this.pageSize, this.sortBy, this.selectedTags)
        .subscribe(allProblemObs => {
          this.problemsShowing = allProblemObs.content;
          this.collectionSize = allProblemObs.totalElements;
          this.isLoadingFilter = false;
        }, () => {
          this.isLoadingFilter = false;
        });
    }
    else {
      this.problemService.getAllProblemPagination(this.pageNo - 1, this.pageSize, this.sortBy)
        .subscribe(allProblemObs => {
          this.problemsShowing = allProblemObs.content;
          this.collectionSize = allProblemObs.totalElements;
          this.isLoadingFilter = false;
        }, () => {
          this.isLoadingFilter = false;
        });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });

    this.form
      .get('search')
      .valueChanges.pipe(
        debounceTime(300),
        tap(() => this.isLoading = true
        )).subscribe(value => {

          if (value && value.length >= 3) {
            this.problemService.searchProblem(value).subscribe(prob => {
              this.filteredProblems = prob;

            }, err => { }, () => {
              this.isLoading = false;
            })
          }
          else {
            this.filteredProblems = [];
            this.isLoading = false;
          }
        })

    this.filterForm = this.fb.group({});
    this.filterControl.valueChanges.subscribe(
      value => {
        this.filteredTagsOptions = this._filter(value);
      })
  }

  private _filter(search: string): Tag[] {
    return this.allTags.filter(value => value.name.toLowerCase().includes(search.toLowerCase()));
  }

  getAllTags() {
    this.tagService.getAllArticles().subscribe(data => this.allTags = data)
  }

  addFilterTag(ntag: Tag) {
    this.tagSearch = '';
    this.expandedFilter = true;
    let tag = ntag;
    this.allTags.some(e => {
      if (e.id === ntag.id) {
        tag = e;
        return true
      }
    });


    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      console.log(this.selectedTags);

      this.filteredByTags = true;
      this.pageNo = 1;
      this.onPageChange();
    }

  }

  removeFilterTag(tag: Tag): void {

    const index = this.selectedTags.indexOf(tag, 0);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    }
    console.log(this.selectedTags);
    if (this.selectedTags.length < 1)
      this.filteredByTags = false;
    this.pageNo = 1;
    this.onPageChange();
  }

  sendToProblem(problem: Problem) {
    this.router.navigateByUrl(`/problem/${problem.id}`);
  }

}
