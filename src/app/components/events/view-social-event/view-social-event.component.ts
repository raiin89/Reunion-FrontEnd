import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
@Component({
  selector: 'app-view-social-event',
  templateUrl: './view-social-event.component.html',
  styleUrls: ['./view-social-event.component.scss']
})
export class ViewSocialEventComponent implements OnInit {

  event: any;
  slides: { image: string}[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    var str = this.router.url;
    var id = str.replace('/social/events/','');
    this.fetchEvent(id);
  }
  fetchEvent(id: string){
    this.clientService.fetchEventById(id).subscribe(x => {
      if(x.success == true){
        this.event = x.data;
        if(this.event.images.length > 0){
          for(let image of this.event.images){
            this.slides.push({
              image: image
            });
          }
        }
        console.log('event: ', this.event);
      }
    }, err => {
      console.log('error while fetching event...!!!')
    });
  }

}
