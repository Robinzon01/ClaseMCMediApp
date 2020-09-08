import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { Medico } from './../_model/medico';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico> {
 // url: string = `${environment.HOST}/medicos`;

  medicoCambio =new Subject<Medico[]>();
  mensaje = new Subject<string>();
  
  constructor(protected http: HttpClient) { 
    super(http, `${environment.HOST}/medicos`);
  }
  /*
  listar() {
    return this.http.get<Medico[]>(this.url);
  }

  listarId(id: number) {
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  registrar(medico: Medico){
    return this.http.post(this.url,medico);
  }

  modificar(medico: Medico) {
    return this.http.put(this.url,medico);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
  */
}
