import { ConsultaListaExamenDTO } from './../_dto/consultaListaExamenDTO';
import { Consulta } from './../_model/consulta';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService extends GenericService<Consulta> {

  constructor(protected http: HttpClient) { 
    super(http, `${environment.HOST}/consultas`);
  }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO){
    return this.http.post(this.url, consultaDTO);
  }

}
