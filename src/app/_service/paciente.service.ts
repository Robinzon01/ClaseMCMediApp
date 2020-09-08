import { GenericService } from './generic.service';

import { Paciente } from './../_model/paciente';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {
  //url: string = `${environment.HOST}/pacientes`;
  
  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) { 
    super(http,`${environment.HOST}/pacientes`);
   }
/*
  listar() {
    return this.http.get<Paciente[]>(this.url);
  }

  listarId(id: number) {
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente: Paciente) {
    return this.http.post(this.url,paciente);
  }

  modificar(paciente: Paciente) {
    return this.http.put(this.url,paciente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
*/
}
