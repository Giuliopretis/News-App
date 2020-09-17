import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { News } from '../News';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  NEWS_URL = 'http://localhost:3000/news'
  public news: any = {}
  newsId

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private newsService: NewsService,
    private router: Router) {

  }

  ngOnInit() {
    this.getNewsInfo()
  }

  getIdFromUrl() {
    let id;
    this.activatedRoute.params.subscribe(params => {
      id = params.id
    })

    return id;
  }

  async getNewsInfo() {
    const id = this.getIdFromUrl()
    const news = await this.newsService.getNewsById(id)
    this.news = new News(news)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Modify the title!',
      inputs: [
        {
          name: 'title',
          value: this.news.title,
          type: 'text',
          placeholder: 'Add title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Modify',
          handler: (data) => {
            this.cerateBodyForNews(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertDelete() {
    const alert = await this.alertController.create({
      header: 'Delete the news!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteNews();
          }
        }
      ]
    });

    await alert.present();
  }

  cerateBodyForNews(data) {
    const body = {
      title: data.title,
      author: data.author,
      number: data.number,
    }
    this.modifyNewsData(body)
  }

  async modifyNewsData(body) {
    const id = this.getIdFromUrl()
    const news = await this.newsService.patchNews(id, body)
    if (news) {
      this.news = news
      this.presentModifiedToast()
    }
  }

  async deleteNews() {
    const id = this.getIdFromUrl()
    const news = await this.newsService.deleteNews(id)
    if (news) {
      this.goToHome()
      this.presentDeletedToast()
    }
  }

  goToHome() {
    this.router.navigate([`home`])
  }

  async presentModifiedToast() {
    const toast = await this.toastController.create({
      message: `News successfully modified!`,
      duration: 2000
    });
    toast.present();
  }

  async presentDeletedToast() {
    const toast = await this.toastController.create({
      message: `News successfully deleted!`,
      duration: 2000
    });
    toast.present();
  }

}
