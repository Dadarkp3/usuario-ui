import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { UsuarioService } from '../servico/usuario.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioResolve implements Resolve<Array<Usuario>> {

    constructor(private service: UsuarioService) {
    }

    resolve(): Observable<Usuario[]> {
        return this.service.obterUsuarios();
    }
}
