import { Observable } from 'rxjs/Observable';
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
  private usuarios: any[];
  mostrarDadosLegenda: boolean;
  observable: Observable<any>;

  constructor(
      private service: UsuarioService,
      private router: ActivatedRoute,
    //   private location: Location
  ) {

  }

  ngOnInit() {
  //   this.router.data.subscribe((rota) => {
  //     this.usuarios = rota;
  //   });
  //   this.carregarPagina();
  //   console.log(this.usuarios);
  // }

//   getTipoEncerramento(tipo: TipoEncerramento) {
//       return tipoEncerramento.get(tipo);
//   }

//   voltar() {
//       this.location.back();
this.carregarPagina();
 }

carregarPagina() {

  this.service.obterUsuarios().subscribe((dados_) => {
    this.usuarios = dados_.data.content;
    console.log(this.usuarios);
  }, (error) => {
    console.log(error);
  });

  console.log(this.usuarios);

}



  }
