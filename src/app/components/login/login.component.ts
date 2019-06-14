import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;
  loginFailedReason:string;
  hideError = true;
  profileForm = new FormGroup({
    email: new FormControl(''),
  });
  @ViewChild('forgetPasswordModal') forgetPasswordModal: ModalDirective;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private cookieService: CookieService
  ){

  }
  login() {
    this.clientService.login(this.email, this.password).subscribe(x => {
      if(x.success == false){
        console.log('login failed, reason: ', x.msg);
        this.loginFailedReason = x.msg;
        this.hideError = false;
      }else{
        this.hideError = true;
        if(x.User){
          this.cookieService.set( 'authToken', x.token );
          this.cookieService.set( 'uid', x.User._id );
          this.cookieService.set( 'email', x.User.email );
          this.cookieService.set( 'name', x.User.name );
          this.cookieService.set( 'role', x.User.role );
          if(x.User.role == 'superAdmin'){
            this.router.navigate(['admin/users']);
          }else if(x.User.role == 'coordinate'){
            this.router.navigate(['admin/events']);
          } else{
            this.loginFailedReason = 'You are not admin user.';
            this.hideError = false;
          }
        }
      }
    }, err => {
      console.log('not login reason: ', err);
    });
  }

  showForgetPassword(){
    this.forgetPasswordModal.show();
  }

  forgetPassword(){
    this.loginFailedReason = 'Password sent to your email address';
    this.hideError = false;
    this.clientService.forgetPassword(this.profileForm.value.email).subscribe(x => {
      if(x.success == false){
        this.loginFailedReason = x.msg;
        this.hideError = false;
      }else{
        this.hideError = true;
      }
    }, err => {
      console.log('not login reason: ', err);
    });
  }

  hideModal(){
    this.forgetPasswordModal.hide();
  }

 }
