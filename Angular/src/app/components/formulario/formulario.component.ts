import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  public user: User;
  public campo: string;

  constructor() {
    this.user = {
      nombre: "",
      apellidos: "",
      bio: "",
      genero: "",
    },
      this.campo = ""
  }

  onSubit() {
    alert('Formulario enviado');
    console.log(this.user);
  }

  hasDadoClick() {
    alert('Has dado click')
  }

  hasSalido() {
    alert('Has salido!!')
  }

  hasDadoEnter(){
    alert('Has dado enter')
  }
}
