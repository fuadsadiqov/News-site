import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  api_key="85681a96e2eb471488f336ec2e46ca45"
  constructor(private http: HttpClient) { }

  initSources(){
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.api_key)
  }
  getArticlesById(source: string){
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&source=' + source + '&apiKey=' + this.api_key);
  }
  initArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.api_key);
  }
}