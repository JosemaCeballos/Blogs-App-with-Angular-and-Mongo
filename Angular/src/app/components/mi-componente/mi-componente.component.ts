import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    templateUrl: "./mi-componente.component.html"
})

export class MiComponente {
    public title: string;
    public comentario: string;
    public year: number;
    public mostrarPelicula: boolean

    constructor() {
        this.title = 'Hola Mundo, soy mi componente';
        this.comentario = 'Este es mi primer componente';
        this.year = 2020;
        this.mostrarPelicula = true;

        console.log('Componente cargado!');
        console.log(this.title, this.comentario, this.year);
    }

    ocultarPeliculas() {
        this.mostrarPelicula = this.mostrarPelicula ? false : true
    }
}