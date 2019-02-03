import { Router } from '@angular/router';
import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { BloqueioService } from './bloqueio.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService extends BaseService<Usuario> {

  constructor(protected http: HttpClient, protected bloqueioService: BloqueioService, protected router: Router) {
    super(http, bloqueioService, router);
  }

  obterUsuarios(): Observable<Usuario[]> {
    const url = `/findAll`;
    return this.get(url, false);
  }

}
