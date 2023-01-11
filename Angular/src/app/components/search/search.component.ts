import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {
  public articles!: Article[]
  public search!: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute, private _router: Router
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var searched = params['search'];
      this.search = searched
      this._articleService.search(searched).subscribe(
        response => {
          if (response.articles) {
            this.articles = response.articles
          } else {

          }
        },
        error => {
          this.articles = []
        }
      )
    })
  }
}
