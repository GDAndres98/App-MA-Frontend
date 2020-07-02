import { Component, OnInit } from '@angular/core';
import { Contest, ContestStats } from 'src/app/model/contest';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';
import { ProblemService } from 'src/app/services/problem/problem.service';
import { Problem } from 'src/app/model/problem';
import { ContestOverviewComponent } from '../contest-overview/contest-overview.component';
import { ContestProblemsComponent } from '../contest-problems/contest-problems.component';
import { ContestService } from 'src/app/services/contest/contest.service';
import { ContestStatusComponent } from '../contest-status/contest-status.component';
import { delay, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-contest-outlet',
  templateUrl: './contest-outlet.component.html',
  styleUrls: ['./contest-outlet.component.css']
})
export class ContestOutletComponent implements OnInit {

  notFound: boolean;
  isLoading: boolean;


  contestProgress: number;
  time: number;
  timeDisplayed: number;
  maxTime: number;
  contestStatus: number; // 0 sin empezar, 1 Corriendo, 2 Terminada
  interval;

  contestStats: ContestStats;
  contest: Contest;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contestService: ContestService,
    private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.getContest();
  }


  getContest() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(params => {
      let contestId = +params['id'];
      this.contestService.getContestById(contestId).subscribe(
        data => {
          this.contestStats = data;
          this.contest = this.contestStats.contest

          this.contest.startTime = new Date(this.contest.startTime);
          this.contest.endTime = new Date(this.contest.endTime);

          this.contest.problems.sort((a, b) => {
            if (a.letter > b.letter)
              return 1;
            if (a.letter < b.letter)
              return -1;
            return 0;
          });

          this.maxTime = (this.contest.endTime.getTime() - this.contest.startTime.getTime());
          this.startTimer();

          this.isLoading = false;
        },
        err => (this.notFound = true, this.isLoading = false))
    });

  }

  startTimer() {
    this.interval = setInterval(() => {
      this.getCurrentTime();
      if (this.time < 0) {
        this.contestStatus = 0;
        this.timeDisplayed = Math.abs(this.time);
        this.contestProgress = 0;
      }
      else if (this.time >= this.maxTime) {
        this.contestStatus = 2;
        this.timeDisplayed = this.maxTime;
        this.contestProgress = 100;
      }
      else {
        this.contestStatus = 1;
        this.contest.isValid = true;
        this.timeDisplayed = this.time;
        if(!(Math.trunc(this.timeDisplayed/1000)%360 )){
          console.log(this.timeDisplayed);
          this.getContest();
        }
        this.contestProgress = this.time / this.maxTime * 100;
      }
    }, 1000);
  }


  onActivate(componentReference: ContestOverviewComponent | ContestProblemsComponent | ContestStatusComponent) {
    if (componentReference instanceof ContestOverviewComponent)
      componentReference.stats = this.contestStats.stats;
    componentReference.contest = this.contest;
  }

  getCurrentTime() {
    this.time = ((new Date()).getTime() - this.contest.startTime.getTime());
  }




}
