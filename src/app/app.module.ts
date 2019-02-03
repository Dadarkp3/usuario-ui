import { BloqueioService } from './servico/bloqueio.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { PesquisarUsuarioComponent } from './pesquisar-usuario/pesquisar-usuario.component';
import { TableUsuarioComponent } from './table-usuario/table-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuarioService } from './servico/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    ListarUsuarioComponent,
    PesquisarUsuarioComponent,
    TableUsuarioComponent,
    EditarUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,



  ],
  providers: [UsuarioService, BloqueioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
