import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/model/level';
import { LevelService } from 'src/app/services/level/level.service';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  public levels: Level[];
  public levelNumber: number;


  constructor(private levelService: LevelService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,) {
    this.levelNumber = 0;
    this.getUserLevel();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let stageId = +params['id'];
      this.levelService.getAllLevelsByStage(stageId).subscribe(data => {
        this.levels = data;
      });
    });

  }

  getUserLevel(event = null) {
    this.userService.getLevelNumber(this.userService.getId(), 1).subscribe(data => {
      this.levelNumber = data;
    });
  }

}
