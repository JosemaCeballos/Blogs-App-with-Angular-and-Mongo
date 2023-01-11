import { PipeTransform, Pipe } from "@angular/core"

@Pipe({
    name: 'espar'
})

export class EsParPipe implements PipeTransform {

    transform(value: any) {
        var espar = 'no es par'
        if (value % 2 == 0) {
            espar = 'es par'
        }
        return `Year: ${value} y ${espar}`;
    }
}