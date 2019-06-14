import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './components/login/login.component';
import { ClientService } from './services/client.service'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FilterPipeModule } from 'ngx-filter-pipe';



const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { UsersComponent } from './components/user/users.component';
import { CookieService } from 'ngx-cookie-service';
import { EventsComponent } from './components/events/event-admin/events.component';
import { HeaderComponent } from './components/header-admin/header.component';
import { NewsComponent } from './components/news/news-admin/news.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { SocialEventsComponent } from './components/events/social-events/social-events.component';
import { SocialNewsComponent } from './components/news/social-news/social-news.component';
import { SocialHeaderComponent } from './components/social-header/social-header.component';
import { ViewSocialEventComponent } from './components/events/view-social-event/view-social-event.component';
import { ViewSocialNewsComponent } from './components/news/view-social-news/view-social-news.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added,
    NgxSpinnerModule,
    ModalModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FilterPipeModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    UsersComponent,
    EventsComponent,
    HeaderComponent,
    NewsComponent,
    AddEventComponent,
    SocialEventsComponent,
    SocialNewsComponent,
    SocialHeaderComponent,
    ViewSocialEventComponent,
    ViewSocialNewsComponent,
  ],
  providers: [ClientService,CookieService,],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
