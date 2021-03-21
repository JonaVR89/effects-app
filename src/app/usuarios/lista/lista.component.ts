import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioServices: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioServices.getUsers()
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios;
      });
  }

}
