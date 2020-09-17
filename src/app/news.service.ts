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
  NEWS_URL = 'http://localhost:3000/news'

  constructor(private httpClient: HttpClient, private http: HTTP, private platform: Platform) {

  }


  async getAllNews() {
    // if (this.platform.is('cordova')) {
    //   const allNews = await this.httpClient.get(this.GET_ALL_NEWS_URL).toPromise();
    // }
    let data = [];

    await this.httpClient.get<News[]>(this.NEWS_URL)
      .toPromise()
      .then(res => {
        data = res
      })
    return data

  }

  async getNewsById(id) {
    let data = {};

    await this.httpClient.get<News[]>(this.NEWS_URL + '/' + id)
      .toPromise()
      .then(res => {
        data = res
      })
    return data

  }

  async addNews(body) {
    let data = {};
    await this.httpClient.post(this.NEWS_URL, body)
    .toPromise()
      .then(res => {
        data = res
      })

    return data
  }

  async patchNews(id, body) {
    let data = {};
    await this.httpClient.patch(this.NEWS_URL + '/' + id, body)
    .toPromise()
      .then(res => {
        data = res
      })

    return data
  }

  async deleteNews(id) {
    let data = {};
    await this.httpClient.delete(this.NEWS_URL + '/' + id)
    .toPromise()
      .then(res => {
        data = res
      })

    return data
  }

}
