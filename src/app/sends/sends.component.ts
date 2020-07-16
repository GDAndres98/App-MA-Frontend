import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Submit } from '../model/submit';
import { SubmitService } from '../services/submit/submit.service';
import { UserService } from '../services/user/user.service';
import { Language, Veredict } from 'src/app/model/submit';
import { MatDialog } from '@angular/material/dialog';
import { DialogSendComponent } from './dialog-send/dialog-send.component';


@Component({
  selector: 'app-sends',
  templateUrl: './sends.component.html',
  styleUrls: ['./sends.component.css']
})
export class SendsComponent implements OnInit {
  myForm2: FormGroup = new FormGroup({Search: new FormControl()});

  submitShowing: Array<Submit>;
  collectionSize: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  isLoading = false;


  language = Language;
  veredict = Veredict;



  constructor(
    private submitService: SubmitService,
    private userService: UserService,
    private dialog: MatDialog) { 
    this.pageNo = 1;
    this.pageSize = 25;
    this.sortBy = "submitDate";    
    this.submitShowing = new Array();

    this.onPageChange();
  }
  ngOnInit(): void {
  }

  onPageChange() {
    this.isLoading = true;
    this.submitService.getUserSubmitPage(this.pageNo - 1, this.pageSize, this.sortBy, false, this.userService.getId())
      .subscribe(submits => {
        this.submitShowing = submits.content;
        this.collectionSize = submits.totalElements;
        
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

  openDialog(submit: Submit): void{
    const dialogRef = this.dialog.open(DialogSendComponent, {
      height: '85%',
      width: '80%',
      data: submit
    });
  }

}
