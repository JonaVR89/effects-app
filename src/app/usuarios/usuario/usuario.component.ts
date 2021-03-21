import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as usuarioActions from '../../store/actions';
import {Usuario} from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario(0, '', '', '', '');
  loading = false;
  error: any;

  constructor(
    private router: ActivatedRoute,
    private store: Store,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.store.select('usuario')
      .subscribe(({user, loading, error}) => {
        this.usuario = user;
        this.loading = loading;
        this.error = error;
      });

    this.router.params
      .subscribe(({id}) => {
        console.log(id);
        this.store.dispatch(usuarioActions.cargarUsuario({id}));
      });
  }

}
