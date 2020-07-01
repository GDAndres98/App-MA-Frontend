import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/auth/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/User';
import { Session } from 'src/app/services/auth/Session';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  errorMessage : string;

  constructor(
    private authService: AuthService, 
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errorMessage = "";
  }
  
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(value =>{
        if(value === null){
          this.snackBar.open('El usuario o la contraseña son erroneas', "Cerrar", { duration: 2000,});
        }

        else{
          this.correctLogin(value);
        }
      });
    }
    this.formSubmitAttempt = true;
  }

  sendToRegister(){
    this.router.navigate(['/register']);
  }

  private correctLogin(data: User){
    let s: Session = new Session();
    s.token = "No se que agregar aquí";
    s.user = data;
    this.storageService.setCurrentSession(s);
    this.router.navigate(['/admin']);
  }

}
