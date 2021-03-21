import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as usuarioActions from '../actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {UsuarioService} from '../../services/usuario.service';
import {of} from 'rxjs';


@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService,
  ) {
  }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap(
        (action) => this.usuarioService.getUserById(action.id)
          .pipe(
            map(usuario => usuarioActions.cargarUsuarioSuccess({usuario})),
            catchError(err => of(usuarioActions.cargarUsuarioError({payload: err})))
          )
      )
    )
  );
}
