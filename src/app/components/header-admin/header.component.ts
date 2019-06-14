import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header-new',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  selectedUserForView:any;
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('updatePasswordModal') updatePasswordModal: ModalDirective;

  changePasswordForm = new FormGroup({
    current: new FormControl(''),
    newPass: new FormControl(''),
    confirmNewPass: new FormControl('')
  });

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private clientService: ClientService,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
  }

  logout(){
    this.cookieService.set( 'authToken', 'removed');
    this.cookieService.delete( 'uid');
    this.router.navigate(['admin/login']);
  }

  showEditProfile(){
    this.cookieService.get( 'uid' );
    this.selectedUserForView = this.cookieService.get( 'uid' );
    this.profileForm.setValue({
      name: this.cookieService.get('name'),
      email: this.cookieService.get( 'email' )
    });
    this.childModal.show();
  }

  showChangePasswordCard(){
    this.updatePasswordModal.show();
  }

  updatePassword(){
    if(this.changePasswordForm.value.newPass == this.changePasswordForm.value.confirmNewPass){
      this.clientService.changePassword(this.changePasswordForm.value.current, this.changePasswordForm.value.newPass)
      .subscribe(x => {
        if(x.success == true){
          this.changePasswordForm.reset();
          this.updatePasswordModal.hide();
          this.toastr.success('Password Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
          this.logout();
        }else{
          this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
        }
      }, err => {
        this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      });
    }else{
      this.toastr.error("Password does not match...!!!", 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    }
  }

  updateUser(){
    this.clientService.updateUser(this.selectedUserForView, this.profileForm.value.name, this.profileForm.value.email)
      .subscribe(x => {
        if(x.success == true){
          this.cookieService.set( 'email', this.profileForm.value.email );
          this.cookieService.set( 'name', this.profileForm.value.name );
          this.profileForm.reset();
          this.childModal.hide();
          this.toastr.success('User Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
        }else{
          this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
        }
      }, err => {
        this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      });

  }

  hideChildModal(modalName:string): void {
    if(modalName == 'changePassword'){
      this.changePasswordForm.reset();
      this.updatePasswordModal.hide();
    }else if(modalName == 'updateUser'){
      this.selectedUserForView = undefined;
      this.profileForm.reset();
      this.childModal.hide();
    }
  }


}
