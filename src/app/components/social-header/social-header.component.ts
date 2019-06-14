import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-header',
  templateUrl: './social-header.component.html',
  styleUrls: ['./social-header.component.scss']
})
export class SocialHeaderComponent implements OnInit {

  subscriberForm = new FormGroup({
    email: new FormControl(''),
  });

  apiMsg = "";
  showSuccessAlert = false;
  showErrorAlert = false;

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit() {
  }

  addSubscriber(){
    this.clientService.addSubscriber(this.subscriberForm.value.email)
    .subscribe(x => {
      if(x.success){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      }
      this.subscriberForm.reset();
      }, err => {
      // this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });
  }

  login(){
    this.router.navigate(['admin/login']);
  }

}
