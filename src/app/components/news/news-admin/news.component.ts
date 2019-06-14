import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../services/client.service'
import { navItems } from '../../../_nav';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormArray , FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  @ViewChild('addNewsModal') addNewsModal: ModalDirective;
  @ViewChild('viewNewsModal') viewNewsModal: ModalDirective;
  @ViewChild('updateNewsModal') updateNewsModal: ModalDirective;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: ModalDirective;

  addNewsForm: FormGroup;
  updateNewsForm: FormGroup;
  links: FormArray;
  imagesList: FormArray;
  newsList: any;
  selectedNews:any;
  p: number = 1;
  imgUrl = "http://localhost:3000/uploads/";
  imgSrc = "";
  apiMsg = "";
  slides: { image: string}[] = [];
  activeSlideIndex = 0;
  myInterval = 1500;
  zeroInterval = 9999999999;
  imagesPreview = [];
  imageDeleteConfirmation = false;
  newsIdToDel: string;
  searchObj:any = {
    headline:'',
    author:''
  };

  showSuccessAlert = false;
  showErrorAlert = false;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {
    this.addNewsForm = this.formBuilder.group({
      headline: '',
      content: '',
      author: '',
      images: this.formBuilder.array([]),
      links: this.formBuilder.array([this.addLinksIntoForm('')])
    });

    this.updateNewsForm = this.formBuilder.group({
      headline: '',
      content: '',
      author: '',
      images: this.formBuilder.array([]),
      links: this.formBuilder.array([])
    });
    this.fetchAllNews();
  }
  addLinksIntoForm(linkURL): FormGroup {
    return this.formBuilder.group({
      link: linkURL
    });
  }
  addLinks(linkURL){
    this.links = this.addNewsForm.get('links') as FormArray;
    this.links.push(this.addLinksIntoForm(linkURL));
  }
  fetchAllNews(){
    var cookieValue = this.cookieService.get('authToken');
    if(cookieValue && cookieValue !== 'removed'){
      this.clientService.fetchAllNews().subscribe(x => {
        if(x.success == true){
          this.newsList = x.data;
        }
      }, err => {});
    }else{
      this.router.navigate(['admin/login']);
    }
  }

  showAddNewsForm(){
    this.addNewsModal.show();
  }

  addNews(){
    this.clientService.addNews(this.addNewsForm.value)
    .subscribe(x => {
      this.fetchAllNews();
      if(x.success == true){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        for(let i = 0; i < this.addNewsForm.value.images.length; i++){
          this.addImageToNews(x.data._id, this.addNewsForm.value.images[i].url);
        }
        this.addNewsModal.hide();
        this.addNewsForm.reset();
        // this.toastr.success('News Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
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

  addImageToNews(newsid:string, image: any){
    this.clientService.addImageToNews(newsid, image)
    .subscribe(x => {
      if(x.success){
        console.log('')
      }else{
        console.log('failed to upload image. please try to update news.');
      }
    }, err => {
      this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });
  }

  hideChildModal(modalName:string): void {
    if(modalName == 'addNews'){
      this.addNewsForm.reset();
      this.addNewsModal.hide();
    }else if(modalName == 'viewNews'){
      this.viewNewsModal.hide();
    }else if(modalName == 'deleteNewsConfimation'){
      this.deleteConfirmationModal.hide();
    }else if(modalName == 'updateNews'){
      this.updateNewsModal.hide();
      this.updateNewsForm.reset();
      var index: number;
        let linksGroup = <FormArray> this.updateNewsForm.controls['links'];
        for (index = linksGroup.length - 1; index > 0; index--) {
          linksGroup.removeAt(index);
        }
    }
  }

  createItem(image): FormGroup {
    return this.formBuilder.group(image);
  }

  addImagesToForm(imagesList:any){
    this.imagesList = this.addNewsForm.get('images') as FormArray;
    if(imagesList.target.files && imagesList.target.files.length) {
      for(let file of imagesList.target.files){
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesList.push(this.createItem({
            url: reader.result  //Base64 string for preview image
        }));
        };
        reader.readAsDataURL(file);
      }
    }

  }

  showViewNewsModal(selectedNews: any){
    this.selectedNews = selectedNews;
    this.slides = [];
    for (let i = 0; i < this.selectedNews.images.length; i++) {
      this.slides.push({
        image: this.selectedNews.images[i]
      });
    }
    this.viewNewsModal.show();
  }

  deleteNews(){
    this.clientService.deleteNewsByID(this.newsIdToDel)
    .subscribe(x => {
      this.fetchAllNews();
      this.deleteConfirmationModal.hide();
      if(x.success == true){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        // this.toastr.success('News Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        // this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      }
    }, err => {
      this.apiMsg = 'Failed to delete this news ... !!!';
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      // this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });

  }

  updateNewsStatus(newsid: string, newsStatus: string){
    var publishTime = new Date();
    // console.log(publishTime.toTimeString());
    // console.log(publishTime.toDateString());
    console.log('publish date: ', publishTime);
    this.clientService.updateNewsStatus(newsid, newsStatus, publishTime)
    .subscribe(x => {
      this.fetchAllNews();
      if(x.success == true){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        // this.toastr.success('News Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        // this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      }
    }, err => {
      this.apiMsg = 'Failed to delete this news ... !!!';
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      // this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });
  }

  showUpdateNewsModal(news){
    this.updateNewsModal.show();
    this.selectedNews = news;
    this.imageDeleteConfirmation = false;
    var index: number;
    //lines to empty array before adding data into it.
    let linksGroup = <FormArray> this.updateNewsForm.controls['links'];
    for (index = linksGroup.length - 1; index > 0; index--) {
      linksGroup.removeAt(index);
    }
    ////////////////////////////////
    for(let i = 0; i<news.links.length;i++){
      this.addLinks(news.links[i]);
    }
    var images = []
    this.slides = [];
    for(let j = 0; j < news.images.length;j++){
      images.push({image: news.images[j]})
      this.slides.push({
        image: news.images[j]
      });
    }
    this.updateNewsForm.patchValue({
      headline: news.headline,
      content: news.content,
      author: news.author
    })
    this.updateNewsForm.setControl('links', this.links);
    this.updateNewsForm.setControl('images', this.formBuilder.array(images));
  }

  updateNews(){
    this.clientService.updateNews(this.updateNewsForm.value, this.selectedNews._id)
    .subscribe(x => {
      this.fetchAllNews();
      if(x.success == true){
        this.apiMsg = x.msg;
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.updateNewsModal.hide();
        this.imageDeleteConfirmation = false;

        var index: number;
        let linksGroup = <FormArray> this.updateNewsForm.controls['links'];
        for (index = linksGroup.length - 1; index > 0; index--) {
          linksGroup.removeAt(index);
        }
        this.updateNewsForm.reset();
        // this.toastr.success('News Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        // this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      }
    }, err => {
      this.apiMsg = 'Failed to update this news ... !!!';
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      // this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.clientService.deleteImageFromNews(this.selectedNews._id, this.slides[toRemove].image)
    .subscribe(x => {
      if(x.success == true){
        this.slides.splice(toRemove, 1);
        this.imageDeleteConfirmation = false;
        // this.toastr.success('News Updated Successfully...!!!', 'Success', {timeOut: 10000, closeButton: true, progressBar: true});
      }else{
        this.apiMsg = x.msg;
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        // this.toastr.error(x.msg, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
      }
    }, err => {
      this.apiMsg = 'Failed to delete this image ... !!!';
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
      // this.toastr.error(err, 'Error', {timeOut: 10000, closeButton: true, progressBar: true});
    });
  }

  updateImageToNews(imagesList: any){
    if(imagesList.target.files && imagesList.target.files.length) {
      for(let file of imagesList.target.files){
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.addImageToNews(this.selectedNews._id, reader.result);
          this.slides.push({
            image: reader.result.toString()
          });
          // this.imagesList.push(this.createItem({
          //   url: reader.result  //Base64 string for preview image
          // }));
        };
        reader.readAsDataURL(file);
      }
    }
  }

  showConfirmationModal(newsId:string){
    this.newsIdToDel = newsId;
    this.deleteConfirmationModal.show();
  }





}
