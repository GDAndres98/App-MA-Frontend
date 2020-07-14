import { Component, OnInit } from '@angular/core';
import { Submit, Veredict, Language } from 'src/app/model/submit';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { ActivatedRoute } from '@angular/router';
import { Contest } from 'src/app/model/contest';

@Component({
  selector: 'app-contest-status',
  templateUrl: './contest-status.component.html',
  styleUrls: ['./contest-status.component.css']
})
export class ContestStatusComponent implements OnInit {

  contest: Contest;

  submitShowing: Array<Submit>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;

  language = Language;
  veredict = Veredict;

  letterOfProblem: Map<number, string>;

  constructor(
    private submitService: SubmitService,
    private routerActivated: ActivatedRoute) {
    this.letterOfProblem = new Map();

    this.pageNo = 1;
    this.pageSize = 10;
    this.sortBy = "id"



  }

  ngOnInit(): void {
    this.onPageChange();
  }

  onPageChange() {
    this.submitService.getContestSubmitPage(this.pageNo - 1, this.pageSize, this.sortBy, false, this.contest.id).subscribe(
      data => {
        this.submitShowing = data.content;
        
        this.collectionSize = data.totalElements;

        this.submitShowing.forEach(submit => {
          if (!this.letterOfProblem.has(submit.problem.id)) {
            this.letterOfProblem.set(submit.problem.id, this.getLetterByProblemId(submit.problem.id));
          }
        });

      });
  }

  getLetterByProblemId(id: number): string {
    let letter = "-";
    this.contest.problems.forEach(problem => {
      if (problem.id == id)
        letter = problem.letter;
    });
    return letter;
  }

}
