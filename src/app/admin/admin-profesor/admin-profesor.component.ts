import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-profesor',
  templateUrl: './admin-profesor.component.html',
  styleUrls: ['./admin-profesor.component.css']
})
export class AdminProfesorComponent implements OnInit {
  
  userId: number;
  findUser: boolean;
  user: User;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
  }

  searchUser(userId: number){
    this.adminService.getUser(userId).subscribe(v =>{
      this.user = v;
      this.findUser = true;
    },
    err =>{
      this.snackBar.open('El usuario no existe', "Cerrar", { duration: 2000,});
      this.user = null;
      this.findUser = false;
    });
  }

  saveUser(){
    let rol: boolean = this.user.profesor;

    this.adminService.setProfesorRole(this.user.id, rol).subscribe(v =>{
      this.snackBar.open('Guardado correctamente', "Cerrar", { duration: 2000,});
    },
    err =>{
      this.snackBar.open('Hubo un error al guardar', "Cerrar", { duration: 2000,});
    });
  }

}
