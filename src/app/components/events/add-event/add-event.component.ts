import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../services/client.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @ViewChild('eventConfirmationModal') eventConfirmationModal: ModalDirective;
  addEventForm: FormGroup;
  links: FormArray;
  imagesList: any[] = [];

  showSuccessAlert = false;
  showErrorAlert = false;
  submitted = false;
  apiMsg = "";

  eventTypes = ['Åbent', 'Delvist lukket','Lukket'];
  eventCatagories = ['Musik og sang', 'Teater', 'Film', 'Udstilling', 'Natur', 'Motion og sport', 'Foredrag og debat', 'Folkefest og festival', 'Kirkelig aktivitet', 'Pædagogisk aktivitet', 'Afstemningfest', 'Jubilæum', 'Børn og unge', 'Andet']
  targetGroups = ['Børn', 'Ynge','Voksne', 'Senior'];

  constructor(private clientService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder) {

     }

  ngOnInit() {
    this.addEventForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(100)]],
      description: ['',[Validators.required, Validators.maxLength(12000)]],
      targetGroup: ['', [Validators.required]],
      eventType: ['', [Validators.required]],
      eventCatagory: ['', [Validators.required]],
      price: ['0', [Validators.required]],
      timings: ['', [Validators.required]],
      arrangername: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]],
      image: [''],
      links: this.formBuilder.array([this.addLinksIntoForm('')])
    });
  }

  get f() { return this.addEventForm.controls; }
  addLinksIntoForm(linkURL): FormGroup {
    return this.formBuilder.group({
      link: linkURL
    });
  }

  addLinks(linkURL){
    this.links = this.addEventForm.get('links') as FormArray;
    this.links.push(this.addLinksIntoForm(linkURL));
  }

  addEvent(){
    console.log('event details: ', this.addEventForm);
    console.log('selected images: ', this.imagesList);
    this.submitted = true;
    if(this.addEventForm.invalid){
      console.log('form is invalid.')
    }else{
      this.clientService.addEvent(this.addEventForm.value)
      .subscribe(x => {
        if(x.success == true){
          this.submitted = false;
          this.addEventForm.reset();
          if(this.imagesList.length > 0){
            for(let i = 0; i < this.imagesList.length; i++){
              this.uploadImage(x.data._id, this.imagesList[i]);
              if(i == this.imagesList.length-1){
                this.showConfirmationModal();
              }
            }
          }else{
            this.showConfirmationModal();
          }
        }else{
        }
      }, err => {
      });
    }
  }


  addImagesToForm(imagesList:any){
    if(imagesList.target.files && imagesList.target.files.length) {
      for(let file of imagesList.target.files){
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesList.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }

  }

  uploadImage(eventid:string, image: any){
    this.clientService.addImageToEvent(eventid, image)
    .subscribe(x => {
      if(x.success){
        console.log('')
      }else{
        console.log('failed to upload image.');
      }
    }, err => {
    });
  }

  showConfirmationModal(){
    this.eventConfirmationModal.show();
  }

  ok(){
    this.eventConfirmationModal.hide();
    this.router.navigate(['social/events']);
  }

}
