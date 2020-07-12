import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/model/level';
import { LevelService } from 'src/app/services/level/level.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  public levels: Level[];
  public levelNumber: number;


  constructor(private levelService: LevelService,
    private userService: UserService) {
    this.levelNumber = 0;
    this.getUserLevel();
  }

  ngOnInit(): void {
    this.levelService.getAllLevels().subscribe(data => {
      this.levels = data;
    });

  }

  getUserLevel(event = null) {
    this.userService.getLevelNumber(this.userService.getId()).subscribe(data => {
      this.levelNumber = data;
    });
    console.log("LLAMADÏSIMO");
  }

}
