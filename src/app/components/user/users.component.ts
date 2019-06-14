import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { navItems } from '../../_nav';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('addUserModal') addUserModal: ModalDirective;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ModalDirective;

  usersList:any;
  selectedUserForView:any;
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  updatingProfile = false;
  isAdmin = false;
  p: number = 1;
  searchObj:any = {
    name:'',
    email:''
  };
  userIdToDel:string;
  apiMsg = "";
  showSuccessAlert = false;
  showErrorAlert = false;
  constructor(
    private ClientService: ClientService,
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
    this.fetchUsers();
  }

  onSubmit() {
    this.ClientService.addUser(this.profileForm.value.name, this.profileForm.value.email)
    .subscribe(x => {
      this.fetchUsers();
      if(x.success == true){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.addUserModal.hide();
        this.profileForm.reset();
        // this.toastr.success('User Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        // this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      }
    }, err => {
      // this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });
  }
  fetchUsers(){
    var cookieValue = this.cookieService.get('authToken');
    if(cookieValue && cookieValue !== 'removed'){
      var adminRole = this.cookieService.get('role');
      if(adminRole == 'superAdmin'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      this.ClientService.fetchAllUsers().subscribe(x => {
        if(x.success == true){
          this.usersList = x.data;
          this.selectedUserForView = this.usersList[0];
        }
      }, err => {
        console.log('error while fetching users...!!!')
      });
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  deleteUser(){
    this.ClientService.deleteUserByID(this.userIdToDel)
    .subscribe(x => {
      if(x.success == true){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.deleteConfirmationModal.hide();
        this.fetchUsers();
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      }
    }, err => {
      console.log('error while deleting users...!!!')
    });
  }
  viewUser(selectedUser:any){
    this.profileForm.setValue({
      name: selectedUser.name,
      email: selectedUser.email
    })
    this.selectedUserForView = selectedUser;
    this.childModal.show();
    // this.hideViewUser = false;
  }

  updateUser(){
    this.ClientService.updateUser(this.selectedUserForView._id, this.profileForm.value.name, this.profileForm.value.email)
      .subscribe(x => {
        if(x.success == true){
          this.apiMsg = x.msg;
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
          if(this.updatingProfile){
            this.cookieService.set( 'email', this.profileForm.value.email );
            this.cookieService.set( 'name', this.profileForm.value.name );
            this.updatingProfile = false;
          }else{
            this.fetchUsers();
          }
          this.profileForm.reset();
          this.childModal.hide();
          // this.toastr.success('User Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
        }else{
          this.apiMsg = x.msg;
          this.showSuccessAlert = false;
          this.showErrorAlert = true;
          // this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
        }
      }, err => {
        this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      });

  }

  addUser(){
    this.addUserModal.show();
  }

  hideChildModal(modalName:string): void {
    if(modalName == 'addUser'){
      this.profileForm.reset();
      this.addUserModal.hide();
    }else if(modalName == 'updateUser'){
      this.selectedUserForView = undefined;
      this.profileForm.reset();
      this.childModal.hide();
    }else if(modalName == 'deleteUserConfirmation'){
      this.deleteConfirmationModal.hide();
    }
  }
  showConfirmationModal(userId:string){
    this.userIdToDel = userId;
    this.deleteConfirmationModal.show();
  }

}
