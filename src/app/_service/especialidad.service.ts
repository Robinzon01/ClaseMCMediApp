import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from './../_model/especialidad';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad> {
  espaciadadCambio = new Subject<Especialidad[]>();
  mensaje = new Subject<string>();
  
  constructor(protected http: HttpClient) { 
    super(http,`${environment.HOST}/especialidades`);
   }
}
