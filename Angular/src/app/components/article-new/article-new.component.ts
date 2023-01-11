import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import swal from 'sweetalert'
import { Article } from 'src/app/models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AfuConf } from 'src/app/services/afuConf';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent {
  public article: Article;
  public status!: string;

  afuConfig: any = AfuConf

  constructor(
    private _articleServide: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', '', null)
  }

  onSubmit() {
    this._articleServide.create(this.article).subscribe(
      response => {
        if (response.status == 'sucess') {
          this.status = 'sucess';
          this.article = response.article;

          swal('Articulo creado!', 'El articulo se ha creado correctamente', 'success')
          this._router.navigate(['/blog'])
        } else {
          this.status = 'error'
        }
      },
      error => {
        console.log(error);
        this.status = 'error'
      }
    )
  }

  imageUpload(data: any) {
    this.article.image = data.body.image
  }
}
