import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { News } from '../app/News';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: News;
  newsArray = [];
  GET_ALL_NEWS_URL = 'http://localhost:3000/news'

  constructor(private httpClient: HttpClient, private http: HTTP, private platform: Platform) {

  }


  getNews() {
    // if (this.platform.is('cordova')) {
    //   const allNews = await this.httpClient.get(this.GET_ALL_NEWS_URL).toPromise();
    // }
    let data = [];
    try {
      this.httpClient.get<any[]>(this.GET_ALL_NEWS_URL)
        .subscribe(res => {
          return data
        },
          error => {
            console.log(error);
            return error
          }
        );
    } catch (error) {

    }

  }

}
