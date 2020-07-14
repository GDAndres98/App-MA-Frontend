import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Level } from 'src/app/model/level';
import { LevelService } from 'src/app/services/level/level.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ContestService } from 'src/app/services/contest/contest.service';
import { DialogArticleComponent } from 'src/app/course/dialog-article/dialog-article.component';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-level-item',
  templateUrl: './level-item.component.html',
  styleUrls: ['./level-item.component.css']
})
export class LevelItemComponent implements OnInit {

  @Input() level: Level;
  @Input() lock: boolean;
  @Input() actual: boolean;
  @Output() eventEmitter = new EventEmitter();

  problemsSolved: number[];

  @ViewChild('callProblemDialog') callProblemDialog: TemplateRef<any>;
  @ViewChild('callSubmitTableDialong') callSubmitTableDialong: TemplateRef<any>;
  dialogRef;
  problemIndex: number;


  isLoadingLevel: boolean;
  disabled: boolean

  constructor(private dialog: MatDialog,
    private levelService: LevelService,
    private userService: UserService,
    private contestService: ContestService) {
    this.isLoadingLevel = true;
    this.disabled = false;
  }

  ngOnInit(): void {
    this.problemsSolved = new Array<number>();
  }

  getLevelData() {
    
    if (this.isLoadingLevel)
      this.levelService.getLevelById(this.level.id).subscribe(data => {
        this.level = data;
        
        this.level.problems.problems.sort((a, b) => {
          if (a.letter > b.letter)
            return 1;
          if (a.letter < b.letter)
            return -1;
          return 0;
        });
        this.level.problems.isValid = true;
        this.isLoadingLevel = false;
        this.getSolvedProblems();
      });
  }

  getSolvedProblems() {
    
    this.contestService.getSolvedProblems(this.level.problems.id, this.userService.getId()).subscribe(data => {
      this.problemsSolved = data;
      this.problemsSolved.includes
    })
  }


  openProblem(index: number) {
    this.problemIndex = index;
    this.dialogRef = this.dialog.open(this.callProblemDialog);
  }

  openArticle(article: Article, onNewWindow: boolean) {
    if (onNewWindow)
      window.open("article/" + article.id);
    else {
      const dialogRef = this.dialog.open(DialogArticleComponent, {
        height: '85vh',
        data: article
      });
    }
  }

  openSubmits() {
    this.dialogRef = this.dialog.open(this.callSubmitTableDialong);
    this.dialogRef.afterClosed().subscribe(result => {
      this.getSolvedProblems();
    });
  }



  returnDone() {
    this.eventEmitter.emit();
  }




}
