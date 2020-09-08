import { EspecialidadService } from './../../_service/especialidad.service';
import { Especialidad } from './../../_model/especialidad';
import { MedicoService } from './../../_service/medico.service';
import { Medico } from './../../_model/medico';
import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from './../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NgModule } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  medicos$: Observable<Medico[]>;
  especialidad$: Observable<Especialidad[]>;

  idPacienteSelecciodo: number;
  idEspeciaSelecciodo: number;

  maxFecha: Date = new Date();
  fechaSeleccinada: Date = new Date();
  
  constructor(
    private serviPaci: PacienteService,
    private serviMedi: MedicoService,
    private serviEspe: EspecialidadService
  ) { }

  ngOnInit(): void {
    this.listarPacientes();
    this.listarMedicos$();
    this.listaEspecialidad$();
  }

  listarPacientes(){
    this.serviPaci.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarMedicos$(){
    this.medicos$ = this.serviMedi.listar();
  }

  listaEspecialidad$(){
    this.especialidad$ = this.serviEspe.listar();
  }

  cambioFecha(e: any){
    console.log(e);
  }

}
