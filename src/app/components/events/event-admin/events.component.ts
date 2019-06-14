import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../services/client.service'
import { navItems } from '../../../_nav';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  @ViewChild('viewEventModal') viewEventModal: ModalDirective;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ModalDirective;
  @ViewChild('rejectionReasonModal') rejectionReasonModal: ModalDirective;

  eventsList: any;
  selectedEvent:any;
  p: number = 1;
  imgUrl = "http://localhost:3000/uploads/";
  imgSrc = "";
  apiMsg = "";
  searchObj:any = {
    name:'',
    targetGroup:'',
    eventCatagory:'',
    location:{
      city:''
    }
  };
  eventIdToDel = '';
  eventToReject : any;
  rejectionReason = '';

  showSuccessAlert = false;
  showErrorAlert = false;
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
    this.fetchAllEvents();
  }

  viewEvent(event: any){
    this.viewEventModal.show();
    this.selectedEvent = event;
    this.imgSrc = this.imgUrl+this.selectedEvent.image;
  }
  deleteEvent(){
    this.clientService.deleteEventByID(this.eventIdToDel)
    .subscribe(x => {
      this.apiMsg = x.msg;
      if(x.success == true){
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.hideConfirmationModal();
        this.fetchAllEvents();
      }else{
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      }
    }, err => {
      console.log('error while deleting event...!!!')
    });
  }

  hideModal(){
    this.viewEventModal.hide();
  }
  hideConfirmationModal(){
    this.deleteConfirmationModal.hide();
  }
  fetchAllEvents(){
    var cookieValue = this.cookieService.get('authToken');
    if(cookieValue && cookieValue !== 'removed'){
      this.clientService.fetchAllEvents().subscribe(x => {
        if(x.success == true){
          this.eventsList = x.data;
        }
      }, err => {
        console.log('error while fetching events...!!!')
      });
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  updateEventStatus(event: any, status: string){
    var cookieValue = this.cookieService.get('authToken');
    if(cookieValue && cookieValue !== 'removed'){
      console.log('event to update status: ', event);
      console.log('status: ', status);
      this.clientService.updateEventStatus(event._id, status, event.arranger.email, this.rejectionReason).subscribe(x => {
        this.apiMsg = x.msg;
        if(x.success == true){
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
          this.fetchAllEvents();
          this.hideModal();
          this.hideRejectionModal();
          this.rejectionReason = '';
        }else{
          this.showSuccessAlert = false;
          this.showErrorAlert = true;
        }
      }, err => {
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        console.log('error while fetching events...!!!')
      });
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  showConfirmationModal(eventId: string){
    this.eventIdToDel = eventId;
    this.deleteConfirmationModal.show();
  }

  showRejectionModal(event: string){
    this.hideModal();
    this.eventToReject = event;
    this.rejectionReasonModal.show();
  }

  hideRejectionModal(){
    this.rejectionReasonModal.hide();
  }

  rejectSelectedEvent(){
    console.log('reason to reject: ', this.rejectionReason, 'event: ', this.eventToReject);
    this.updateEventStatus(this.eventToReject, 'rejected');
  }

}
