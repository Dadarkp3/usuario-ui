import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { UsuarioService } from '../servico/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.scss']
})
export class TableUsuarioComponent implements OnInit {

  id: number;
  usuarios: Usuario[];
  mostrarDadosLegenda: boolean;

  constructor(
      private service: UsuarioService,
      private router: ActivatedRoute,
    //   private location: Location
  ) {
    this.service.obterUsuarios().subscribe(
        dados_ => {
          this.usuarios = dados_;
        });

  }

  ngOnInit() {
      console.log(this.usuarios);
  }

//   getTipoEncerramento(tipo: TipoEncerramento) {
//       return tipoEncerramento.get(tipo);
//   }

//   voltar() {
//       this.location.back();
// }

}
