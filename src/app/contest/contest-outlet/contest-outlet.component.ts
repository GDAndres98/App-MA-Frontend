import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/model/contest';
import { stat } from 'fs';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-contest-outlet',
  templateUrl: './contest-outlet.component.html',
  styleUrls: ['./contest-outlet.component.css']
})
export class ContestOutletComponent implements OnInit {


  contestProgress: number;
  time: number;
  timeDisplayed: number;
  maxTime: number;
  contestStatus: number; // 0 sin empezar, 1 Corriendo, 2 Terminada
  interval;


  contest: Contest;

  constructor(
    private routerActivated: ActivatedRoute,
    private courseService: CourseService) {




  }

  ngOnInit(): void {



    this.contest = new Contest();
    this.contest.name = "Entrenamiento Junio 25";
    this.contest.startTime = new Date(2020, 5, 25, 18, 30);
    this.contest.endTime = new Date(2020, 6, 9, 18, 30);

    this.maxTime = (this.contest.endTime.getTime() - this.contest.startTime.getTime());
    this.startTimer();
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
        console.log(this.timeDisplayed);
        this.contestProgress = 100;
      }
      else {
        this.contestStatus = 1;
        this.timeDisplayed = this.time;
        this.contestProgress = this.time / this.maxTime * 100;
      }
    }, 1000);
  }


  fake(): void {

  }

  getCurrentTime() {
    this.time = ((new Date()).getTime() - this.contest.startTime.getTime());
  }




}
