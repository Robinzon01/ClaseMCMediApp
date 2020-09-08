import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Examen } from './../_model/examen';
import { GenericService } from './generic.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen> {
  examenCambio = new Subject<Examen[]>();
  mensaje = new Subject<string>();
  constructor(protected http: HttpClient) { 
    super(http,`${environment.HOST}/examenes`);
  }
}
