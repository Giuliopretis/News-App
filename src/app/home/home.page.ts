import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
    private httpClient: HttpClient,
    private router: Router,
    private alertController: AlertController) { }


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
    this.httpClient.get<News[]>(this.NEWS_URL)
      .subscribe(res => {
        // res.forEach(el => {
        //   const news = new News(el)
        //   this.allNews.push(news)
        // })
        this.allNews = res;
      },
        error => {
          console.log(error);
          return error
        }
      );
    return []
  }

  navigateToNews(id) {
    this.router.navigate([`/news/${id}`])
  }

  addNewNews(body) {
    this.httpClient.post(this.NEWS_URL, body)
      .subscribe(
        (val) => {

        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  cerateBodyForNews(data) {
    const body = {
      title: data.title,
      author: data.author,
      number: data.number,
    }
    this.addNewNews(body)
  }

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
            this.addNewNews(data);
          }
        }
      ]
    });

    await alert.present();
  }

  // getNews(): Promise<News[]> {
  //   return this.news.getNews();
  // }
}
