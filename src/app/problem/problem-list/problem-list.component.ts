import { Component, OnInit } from '@angular/core';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { Problem } from 'src/app/model/problem';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  allProblem: Array<Problem>;
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
    private fb: FormBuilder,
    private router: Router
  ) {
    this.pageNo = 1;
    this.pageSize = 7;
    this.sortBy = "id";

    this.allProblem = new Array();
    this.onPageChange();
   }

   onPageChange() {
    this.problemService.getAllProblemPagination(this.pageNo - 1, this.pageSize, this.sortBy).subscribe(allProblemObs => {
      this.allProblem = allProblemObs.content;
      this.collectionSize = allProblemObs.totalElements;
    }
    );
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
      )).subscribe(value =>{
        
        if(value && value.length >= 3){           
            this.problemService.searchProblem(value).subscribe(prob =>{                        
            this.filteredProblems = prob;
            
            },err =>{}, () =>{              
              this.isLoading = false;
            })
        }
        else{
          this.filteredProblems = [];
          this.isLoading = false;
        }
    })
  }

  sendToProblem(problem: Problem){
    this.router.navigateByUrl(`/problem/${problem.id}`);
  }

}
