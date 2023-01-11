import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculaService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public peliculas: Array<Pelicula>;
  public favorita!: Pelicula;
  public fecha: any

  constructor(private _peliculaService: PeliculaService) {
    this.titulo = 'Componente pelicula :D'
    this.peliculas = this._peliculaService.getPeliculas(),
      this.fecha = new Date(2020, 8, 12)
  }

  ngOnInit() {
    console.log(this.peliculas);
    console.log('Componente iniciado! Dentro de un onInit se mete funcionalidad');
    console.log(this._peliculaService.holaMundo());

  }

  ngDoCheck() {
    //console.log('El que genera cambios (un useEffect)');
  }

  ngOnDestroy() {
    console.log('El componente se va a eliminar de la ejecución instantanea que tiene');
  }

  cambiarTitulo() {
    this.titulo = "El titulo ha sido cambiado"
  }

  mostrarFavorita(event: { pelicula: Pelicula }) {
    this.favorita = event.pelicula
  }
}
