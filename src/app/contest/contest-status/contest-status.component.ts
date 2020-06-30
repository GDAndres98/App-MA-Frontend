import { Component, OnInit } from '@angular/core';
import { Submit, Veredict, Language } from 'src/app/model/submit';
import { SubmitService } from 'src/app/services/submit/submit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-status',
  templateUrl: './contest-status.component.html',
  styleUrls: ['./contest-status.component.css']
})
export class ContestStatusComponent implements OnInit {

  submitShowing: Array<Submit>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;

  language = Language;
  veredict = Veredict;


  constructor(
    private submitService: SubmitService,
    private routerActivated: ActivatedRoute) {
    this.pageNo = 1;
    this.pageSize = 10;
    this.sortBy = "id"


  }

  ngOnInit(): void {
    this.routerActivated.parent.params.subscribe(params => {
      let contestId = +params['id'];
      console.log("contestID->"+contestId);
      this.submitService.getContestSubmitPage(this.pageNo - 1, this.pageSize, this.sortBy, false, contestId).subscribe(
        data => {
          this.submitShowing = data.content;
          this.collectionSize = data.totalElements;
          console.log(this.submitShowing);
        });

    });
  }

  onPageChange() {

  }

}
