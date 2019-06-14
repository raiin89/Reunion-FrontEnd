import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-events',
  templateUrl: './social-events.component.html',
  styleUrls: ['./social-events.component.scss']
})
export class SocialEventsComponent implements OnInit {

  events: any;
  news: any;
  slides: { image: string}[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.fetchEvents();
    this.fetchNews();
  }

  fetchEvents(){
    this.clientService.fetchApprovedEvents().subscribe(x => {
      if(x.success == true){
        this.events = x.data;
        console.log('events: ', this.events);
      }
    }, err => {
      console.log('error while fetching events...!!!')
    });
  }

  fetchNews(){
    this.clientService.fetchPublishedNews().subscribe(x => {
      if(x.success == true){
        this.news = x.data;
        console.log('news: ', this.news);
      }
    }, err => {
      console.log('error while fetching news...!!!')
    });
  }

  viewEvent(eventId: string){
    this.router.navigate(['social/events/'+eventId]);
  }

  viewNews(newsId: string){
    this.router.navigate(['social/news/'+newsId]);
  }

}
