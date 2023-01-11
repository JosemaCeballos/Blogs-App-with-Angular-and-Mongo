import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})

export class ArticleComponent implements OnInit {
  public article!: Article
  public url: string

  constructor(private _articleService: ArticleService, private _route: ActivatedRoute, private _router: Router) {
    this.url = Global.url
  }

  ngOnInit() {
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

  delete(id: string) {
    swal({
      title: "Estas seguro que deseas eliminarlo?",
      text: "Una vez borrado, no podrá ser recuperado!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._articleService.delete(id).subscribe(
            response => {
              swal("Articulo borrado correctamente!", {
                icon: "success",
              });
              this._router.navigate(['/blog'])
            },
            error => {
              console.log(error);
            }
          )
        } else {
          swal("El articulo no ha sido borrado");
        }
      });
  }
}
