
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AlertsService } from '../alerts.service';
import { News } from '../News';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  allNews: any = []
  // allNews: any = []
  NEWS_URL = 'http://localhost:3000/news'

  constructor(
    private newsService: NewsService,
    private router: Router,
    private alertController: AlertController,
    private alertService: AlertsService) { }


  ngOnInit() {
    this.retrieveNews()
  }

  async doRefresh(event) {
    const op = await this.retrieveNews()

    if (op) {
      event.target.complete();
    }
  }

  async retrieveNews() {
    const cose = await this.newsService.getAllNews()
    return this.allNews = cose
  }

  navigateToNews(id) {
    this.router.navigate([`/news/${id}`])
  }

  async addNewNews(body) {
    const added = await this.newsService.addNews(body)
    if (added) {
      this.alertService.presentAddedNewsToast(added)
    }
  }

  cerateBodyForNews(data) {
    const body = {
      title: data.title,
      author: data.author,
      number: data.number,
    }
    this.addNewNews(body)
  }

  // openAlert() {
  //   this.alertService.presentAlertAddingNews()
  // }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Add a news!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Add title'
        },
        {
          name: 'author',
          type: 'text',
          placeholder: 'Add the author'
        },
        {
          name: 'number',
          type: 'number',
          placeholder: 'The news number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Add',
          handler: (data) => {
            if (this.validateAlertInputs(data)) {
              return this.addNewNews(data);
            }
            this.alertService.presentErrorAddingNews()
          }
        }
      ]
    });

    await alert.present();
  }

  validateAlertInputs(data) {
    if (data.title || data.auhtor || data.number === '') {
      return false
    }
    return true
  }

  // getNews(): Promise<News[]> {
  //   return this.news.getNews();
  // }
}
