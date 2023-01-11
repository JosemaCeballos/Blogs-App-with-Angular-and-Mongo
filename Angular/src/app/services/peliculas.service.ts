import { Injectable } from "@angular/core"
import { Pelicula } from "../models/pelicula"

@Injectable()
export class PeliculaService {
    public peliculas: Pelicula[]

    constructor() {
        this.peliculas = [
            new Pelicula(2019, 'Spiderman', 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/06/Marvel-Un-viejo-personaje-portara-el-traje-de-SpiderMan-sustituyendo-a-Peter-Parker-en-los-comics.png?resize=1280%2C720&quality=80&ssl=1'),
            new Pelicula(2020, 'Los vengadores: Endgame', 'https://www.infobae.com/new-resizer/oftRX9IO2l5uY3ktTBhE7YsW7v8=/1200x900/filters:format(webp):quality(85)//s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/04/24133716/avengers-endgame-22.jpg'),
            new Pelicula(2021, 'Batman vs Superman', 'https://as.com/ocio/imagenes/2016/04/10/cine/1460272862_892134_1460273063_noticia_grande.jpg')
        ]
    }

    holaMundo() {
        return 'Hola mundo desde el servicio de Angular'
    }

    getPeliculas() {
        return this.peliculas
    }
}