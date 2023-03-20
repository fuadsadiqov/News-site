import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  
  public sources: any = []
  public articles: any = []
  public selectedNewsChannel: any
  @ViewChild(MatSidenav) sideNav!: MatSidenav
  
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private newsApi: NewsService){}
  
  ngOnInit(): void {
  this.newsApi.initArticles()
  .subscribe((res: any) => {
    this.articles = res.articles
  })
  this.newsApi.initSources()
  .subscribe((res: any) => {    
    this.sources = res.articles
  })
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true
    this.observer.observe(['(max-width: 786px)'])
    .subscribe((res) => {
      if(res?.matches){
        this.sideNav.mode = "over"
        this.sideNav.close()
      }
      else{
        this.sideNav.mode = "side"
        this.sideNav.open()
      }
    })
    this.cdr.detectChanges()
  }
  getChannel(channel: any){
    this.selectedNewsChannel = channel.source.name
    this.newsApi.getArticlesById(channel.source.id)
    .subscribe((res: any) => {
      if(res.articles.length !== 0){
        this.articles = res.articles
      }
    })
  }
}