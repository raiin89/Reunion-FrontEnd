import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/user/users.component'
import { EventsComponent } from './components/events/event-admin/events.component';
import { NewsComponent } from './components/news/news-admin/news.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { SocialEventsComponent } from './components/events/social-events/social-events.component';
import { SocialNewsComponent } from './components/news/social-news/social-news.component';
import { ViewSocialEventComponent } from './components/events/view-social-event/view-social-event.component';
import { ViewSocialNewsComponent } from './components/news/view-social-news/view-social-news.component';


export const routes: Routes = [

  {
    path: '',
    component: SocialEventsComponent,
    data: {
      title: 'Social Events Page'
    }
  },
  {
    path: 'admin/users',
    component: UsersComponent
  },
  {
    path: 'social/addevent',
    component: AddEventComponent
  },
  {
    path: 'social/news',
    component: ViewSocialNewsComponent
  },
  {
    path: 'social/news/:newsid',
    component: ViewSocialNewsComponent
  },
  {
    path: 'social/events',
    component: SocialEventsComponent
  },
  {
    path: 'social/events/:eventid',
    component: ViewSocialEventComponent
  },
  {
    path: 'admin/news',
    component: NewsComponent
  },
  {
    path: 'admin/events',
    component: EventsComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'admin',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
