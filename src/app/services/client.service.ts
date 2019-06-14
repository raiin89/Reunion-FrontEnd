import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseURL = 'http://165.227.129.108:3000';
  //baseURL = 'http://localhost:3000';
  cookieValue:string;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  login(email:string, password:string): Observable <any>{
    return this.http.post(this.baseURL+'/api/users/signin', {"email":email, "password": password});
  }

  upload(filedata:FormData): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/createadminmeme', filedata, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }


  fetchAllUsers(): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/fetchalluser', {"page": 0,"limit": 10}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }


  fetchAllEvents(): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.get(this.baseURL+'/api/events/fetchallevents', httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  fetchApprovedEvents(): Observable <any> {
    return this.http.get(this.baseURL+'/api/events/fetchapprovedevents');
  }
  fetchPublishedNews(): Observable <any> {
    return this.http.get(this.baseURL+'/api/news/fetchpublishednews');
  }
  fetchEventById(id: string): Observable <any> {
    return this.http.get(this.baseURL+'/api/events/fetcheventbyid/'+id);
  }
  fetchNewsById(id: string): Observable <any> {
    return this.http.get(this.baseURL+'/api/news/fetchnewsbyid/'+id);
  }

  fetchAllNews(): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.get(this.baseURL+'/api/news/fetchallnews', httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  forgetPassword(email: string): Observable <any> {
    return this.http.post(this.baseURL+'/api/users/forgetpassword', {"email": email});
  }


  fetchUserByID(userid: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/fetchuser', {"userid": userid, "fetchedby": userid}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  deleteUserByID(userid: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/deleteuser', {"userid": userid}, httpOptions);
    }else{
      this.router.navigate(['a  dmin/login']);
    }
  }

  deleteEventByID(eventid: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/events/deleteevent', {"eventid": eventid}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  deleteNewsByID(newsid: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/news/deletenews', {"newsid": newsid}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  deleteImageFromNews(newsid: string, newsImage: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/news/deleteimagefromnews', {"newsid": newsid, image: newsImage}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  updateUserProfile(name: string, email: string, password: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/edituser', {"email": email,"password": password,"name": name,}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  updateUser(id: string, name: string, email: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/edituser', {"id": id, "email": email,"name": name}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  updateEventStatus(id: string, status: string, email: string, reason: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/events/updatestatus', {"id": id, "status": status, "arranger": email, "rejectionReason":reason}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  updateNewsStatus(id: string, status: string, time: any): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/news/updatenewsstatus', {"id": id, "status": status, time: time}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  addUser(name: string, email: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/adduser', {"email": email,"name": name}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  addSubscriber(email: string): Observable <any> {
    return this.http.post(this.baseURL+'/api/subscriber/addsubscriber', {"email": email});
  }
  addNews(newsData: any): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      var linksArray = [];

      for(let i = 0; i < newsData.links.length; i++){
        if(newsData.links[i].link !== '' && newsData.links[i].link !== null){
          linksArray.push(newsData.links[i].link);
        }
      }
      var publishTime = new Date();

      var data = {
        'author': newsData.author,
        'headline': newsData.headline,
        'content': newsData.content,
        'links': linksArray,
        'newsStatus': 'published',
        'publishDateTime': publishTime
      };
      return this.http.post(this.baseURL+'/api/news/addnews', {data}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  addEvent(eventData: any): Observable <any> {

      var linksArray = [];
      for(let i = 0; i < eventData.links.length; i++){
        if(eventData.links[i].link !== '' && eventData.links[i].link !== null){
          linksArray.push(eventData.links[i].link);
        }
      }
      var data = {
        name: eventData.name,
        description: eventData.description,
        timings: eventData.timings,
        price: Number(eventData.price),
        targetGroup: eventData.targetGroup,
        eventType: eventData.eventType,
        eventCatagory: eventData.eventCatagory,
        approvalStatus: 'pending',
        links: linksArray,
        arranger: {
          name: eventData.arrangername,
          email: eventData.email,
          phone: eventData.phone
        },
        location:{
          address: eventData.address,
          zip: eventData.zip,
          city: eventData.city
        }
      };
      return this.http.post(this.baseURL+'/api/events/addEvent', {data});
  }

  updateNews(newsData: any, id: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      var linksArray = [];

      for(let i = 0; i < newsData.links.length; i++){
        if(newsData.links[i].link !== '' && newsData.links[i].link !== null){
          linksArray.push(newsData.links[i].link);
        }
      }
      var data = {
        'id': id,
        'data':{
          'author': newsData.author,
          'headline': newsData.headline,
          'content': newsData.content,
          'links': linksArray
        }

      };
      return this.http.post(this.baseURL+'/api/news/updatenews', {data}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  addImageToNews(newsid: string, newsimage: any): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/news/addimagetonews', {id: newsid, image: newsimage}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }
  addImageToEvent(eventid: string, eventimage: any): Observable <any> {
    return this.http.post(this.baseURL+'/api/events/addimagetoevent', {id: eventid, image: eventimage});
  }

  changePassword(password: string, newPassword: string): Observable <any> {
    this.cookieValue = this.cookieService.get('authToken');
    var email = this.cookieService.get('email');
    if(this.cookieValue && this.cookieValue !== 'removed'){
      const httpOptions = {headers: new HttpHeaders({'Authorization': 'jwt '+ this.cookieValue})};
      return this.http.post(this.baseURL+'/api/users/changepassword', {"email": email,"password": password,"newpassword": newPassword}, httpOptions);
    }else{
      this.router.navigate(['admin/login']);
    }
  }

}
