import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { News } from '../News';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  allNews: any = []
  GET_ALL_NEWS_URL = 'http://localhost:3000/news'

  constructor(
    private newsService: NewsService,
    private httpClient: HttpClient,
    private router: Router) { }


  ngOnInit() {
    this.retrieveNews()
  }

  retrieveNews() {
    this.httpClient.get<News[]>(this.GET_ALL_NEWS_URL)
      .subscribe(res => {
        this.allNews = res;
      },
        error => {
          console.log(error);
          return error
        }
      );
  }

  navigateToNews(id) {
    // this.nav.navigateRoot('/news')
    this.router.navigate([`/news/${id}`])
  }

  // getNews(): Promise<News[]> {
  //   return this.news.getNews();
  // }
}
