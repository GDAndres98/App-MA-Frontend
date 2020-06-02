import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { StorageService } from '../services/auth/storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  myForm: FormGroup;
  name: string = "";

  constructor(private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.userService.name.subscribe(v => this.name = v);
  }

  logout(){
    this.storageService.logout();
  }

}
