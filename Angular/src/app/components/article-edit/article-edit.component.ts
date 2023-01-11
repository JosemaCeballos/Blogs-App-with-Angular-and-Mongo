import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import swal from 'sweetalert';
import { Article } from 'src/app/models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AfuConf } from 'src/app/services/afuConf';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})

export class ArticleEditComponent implements OnInit {
  public article: Article;
  public status!: string;
  public is_edit: boolean;
  public url: string;

  afuConfig: any = AfuConf

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', '', null)
    this.is_edit = true
    this.url = Global.url
  }

  ngOnInit() {
    this.getArticle()
  }

  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'sucess') {
          this.status = 'sucess';
          this.article = response.article;
          swal('Articulo editado!', 'El articulo se ha editado correctamente', 'success')
          this._router.navigate(['/blog/articulo', this.article._id])
        } else {
          this.status = 'error'
          swal('Edición fallida!', 'El articulo no se ha editado', 'error')
        }
      },
      error => {
        swal('Edición fallida!', 'El articulo no se ha editado', 'error')
        this.status = 'error'
      }
    )
  }

  imageUpload(data: any) {
    this.article.image = data.body.image
  }

  getArticle() {
    this._route.params.subscribe(params => {
      let id = params['id']
      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article
          } else {
            this._router.navigate(['/home'])
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home'])
        }
      )
    })
  }
}
