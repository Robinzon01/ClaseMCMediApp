import { ConsultaService } from './../../_service/consulta.service';
import { ConsultaListaExamenDTO } from './../../_dto/consultaListaExamenDTO';
import { Consulta } from './../../_model/consulta';
import { ExamenService } from './../../_service/examen.service';
import { Examen } from './../../_model/examen';
import { DetalleConsulta } from './../../_model/detalle-consulta';
import { EspecialidadService } from './../../_service/especialidad.service';
import { Especialidad } from './../../_model/especialidad';
import { MedicoService } from './../../_service/medico.service';
import { Medico } from './../../_model/medico';
import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from './../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes$: Observable<Paciente[]>;
  medicos$: Observable<Medico[]>;
  especialidad$: Observable<Especialidad[]>;
  examen$: Observable<Examen[]>;

  idPacienteSelecciodo: number;
  idMedicoSelecciodo: number;
  idEspeciaSelecciodo: number;
  idExamenSelecciodo: number;

  maxFecha: Date = new Date();
  fechaSeleccinada: Date = new Date();

  diagnostico: string;
  tratamiento: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenSeleccionados: Examen[] = [];
  
  constructor(
    private serviPaci: PacienteService,
    private serviMedi: MedicoService,
    private serviEspe: EspecialidadService,
    private serviExa: ExamenService,
    private serviConsulta: ConsultaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarPacientes();
    this.listarMedicos$();
    this.listaEspecialidad$();
    this.listaExamen$();
  }

  listarPacientes(){
    this.pacientes$ = this.serviPaci.listar();
  }

  listarMedicos$(){
    this.medicos$ = this.serviMedi.listar();
  }

  listaEspecialidad$(){
    this.especialidad$ = this.serviEspe.listar();
  }

  listaExamen$(){
    this.examen$ = this.serviExa.listar();
  }

  cambioFecha(e: any){
    console.log(e);
  }

  agregar(){
    if(this.diagnostico != null && this.tratamiento != null){
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);

      this.diagnostico = null;
      this.tratamiento = null;
    }

  }

  removerDiagnostico(i: number){
    this.detalleConsulta.splice(i,1);
  }

  agregarExamenes(){
    let exa = new Examen();
    exa.idExamen = this.idExamenSelecciodo;
    this.examenSeleccionados.push(exa);
  }

  removerExamen(index: number){
    this.examenSeleccionados.splice(index,1);
  }

  aceptar(){
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSelecciodo;

    let medico = new Medico();
    medico.idMedico = this.idMedicoSelecciodo;

    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspeciaSelecciodo;

    let consulta = new Consulta();
    consulta.especialidad= especialidad;
    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.numConsulta = 'C1';

    consulta.fecha = moment(this.fechaSeleccinada).format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamenes = this.examenSeleccionados;

    this.serviConsulta.registrarTransaccion(consultaListaExamenDTO).subscribe( () => {
      this.snackBar.open("SE REGISTRO","AVISO",{duration: 3000});
    });
  }

}
