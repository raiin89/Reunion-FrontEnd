import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-view-social-news',
  templateUrl: './view-social-news.component.html',
  styleUrls: ['./view-social-news.component.scss']
})
export class ViewSocialNewsComponent implements OnInit {

  news: any;
  slides: { image: string}[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    var str = this.router.url;
    var id = str.replace('/social/news/','');
    this.fetchNews(id);
  }

  fetchNews(id: string){
    this.clientService.fetchNewsById(id).subscribe(x => {
      if(x.success == true){
        this.news = x.data;
        if(this.news.images.length > 0){
          for(let image of this.news.images){
            this.slides.push({
              image: image
            });
          }
        }
        console.log('event: ', this.news);
      }
    }, err => {
      console.log('error while fetching event...!!!')
    });
  }

}
