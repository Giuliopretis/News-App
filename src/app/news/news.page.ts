import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  GET_ALL_NEWS_URL = 'http://localhost:3000/news'
  news = {}
  newsId

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {

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
    this.httpClient.get(this.GET_ALL_NEWS_URL + '/' + id)
      .subscribe(res => {
        this.news = res;
      },
        error => {
          console.log(error);
          return error
        }
      );
  }

}
