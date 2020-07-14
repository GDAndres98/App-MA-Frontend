import { Component, OnInit } from '@angular/core';
import { ContestService } from 'src/app/services/contest/contest.service';
import { ContestPreview } from 'src/app/model/contest';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {


  runningContests: ContestPreview[];
  futureContests: ContestPreview[];

  pastContests: ContestPreview[];
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;




  constructor(private contestService: ContestService) {
    this.pageNo = 1;
    this.pageSize = 3;
    this.sortBy = "id";

    this.getRuningContests();
    this.getFutureContests();
    this.getPastContestsPage();
  }

  ngOnInit(): void {
  }

  getRuningContests() {
    this.contestService.getRunningContests().subscribe(
      data => {
        this.runningContests = data;
      });
  }

  getFutureContests() {
    this.contestService.getFutureContests().subscribe(
      data => {
        this.futureContests = data;
      });
  }

  getPastContestsPage() {
    this.contestService.getPastContests(this.pageNo - 1, this.pageSize, this.sortBy).subscribe(
      data => {
        this.pastContests = data.content;

        this.collectionSize = data.totalElements;
      });
  }

}
