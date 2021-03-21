import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as usuariosActions from '../actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {UsuarioService} from '../../services/usuario.service';
import {of} from 'rxjs';


@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService,
  ) {
  }

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(
        () => this.usuarioService.getUsers()
          .pipe(
            map(usuarios => usuariosActions.cargarUsuariosSuccess({usuarios})),
            catchError(err => of(usuariosActions.cargarUsuariosError({payload: err})))
          )
      )
    )
  );
}
