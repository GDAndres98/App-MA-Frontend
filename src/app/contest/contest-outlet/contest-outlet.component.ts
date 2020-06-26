import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/model/contest';
import { stat } from 'fs';

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
  state: number; // 0 sin empezar, 1 Corriendo, 2 Terminada
  interval;


  contest: Contest;

  constructor() { }

  ngOnInit(): void {



    this.contest = new Contest();
    this.contest.name = "Entrenamiento Junio 25";
    this.contest.startTime = new Date(2020, 5, 25, 18, 30);
    this.contest.endTime = new Date(2020, 6, 9, 18, 30);

    console.log(this.contest.endTime);
    console.log(this.contest.endTime.getTime());
    console.log((new Date()));
    console.log((new Date()).getTime());

    this.maxTime = (this.contest.endTime.getTime() - this.contest.startTime.getTime());
    this.startTimer();
  }


  startTimer() {
    this.interval = setInterval(() => {
      this.getCurrentTime();
      if (this.time < 0) {
        this.state = 0;
        this.timeDisplayed = 0;
        this.contestProgress = 0;
      }
      else if (this.time >= this.maxTime) {
        this.timeDisplayed = this.maxTime;
        this.contestProgress = 100;
      }
      else {
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
