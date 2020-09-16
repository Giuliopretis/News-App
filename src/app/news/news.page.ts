import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { News } from '../News';

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
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
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

  getNewsInfo() {
    const id = this.getIdFromUrl()
    this.httpClient.get(this.NEWS_URL + '/' + id)
      .subscribe(res => {
        this.news = new News(res);
        console.log(this.news);

      },
        error => {
          console.log(error);
          return error
        }
      );
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
        },
        // {
        //   name: 'author',
        //   value: this.news.author,
        //   type: 'text',
        //   placeholder: 'Add the author'
        // },
        // {
        //   name: 'number',
        //   value: this.news.number,
        //   type: 'number',
        //   placeholder: 'The news number'
        // }
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

  modifyNewsData(body) {
    const id = this.getIdFromUrl()
    this.httpClient.patch(this.NEWS_URL + '/' + id, body)
      .subscribe(
        (val) => {
          this.news = val
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  deleteNews() {
    const id = this.getIdFromUrl()
    this.httpClient.delete(this.NEWS_URL + '/' + id)
      .subscribe(
        (val) => {
          this.goToHome()
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  goToHome() {
    this.router.navigate([`home`])
  }

}
