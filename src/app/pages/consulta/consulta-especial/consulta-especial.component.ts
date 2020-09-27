import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultaService } from './../../../_service/consulta.service';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { ExamenService } from './../../../_service/examen.service';
import { MedicoService } from './../../../_service/medico.service';
import { PacienteService } from './../../../_service/paciente.service';
import { DetalleConsulta } from './../../../_model/detalle-consulta';
import { Examen } from './../../../_model/examen';
import { Especialidad } from './../../../_model/especialidad';
import { Paciente } from './../../../_model/paciente';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-consulta-especial',
  templateUrl: './consulta-especial.component.html',
  styleUrls: ['./consulta-especial.component.css']
})
export class ConsultaEspecialComponent implements OnInit {
  form: FormGroup;
  /*
  pacientes$: Observable<Paciente[]>;
  medicos$: Observable<Medico[]>;
  especialidades$: Observable<Especialidad[]>;
  examenes$: Observable<Examen[]>;
  */
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  especialidades: Especialidad[] = [];
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenSeleccionados: Examen[] = [];

  diagnostico:string;
  tratamiento: string;
  mensaje: string;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionado: Especialidad;
  examenSeleccionado: Examen;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  
  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();
  myControlEspecialidad: FormControl = new FormControl();
 // myControlExamen: FormControl = new FormControl();

  pacientesFiltrados: Observable<Paciente[]>;
  medicosFiltrados: Observable<Medico[]>;
  especialidadesFiltrados: Observable<Especialidad[]>;

  constructor(
    private serviPaciente: PacienteService,
    private serviMedico: MedicoService,
    private serviExam: ExamenService,
    private serviEspecia: EspecialidadService,
    private serviConsuta: ConsultaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,
      'especialidad': this.myControlEspecialidad,
      'medico': this.myControlMedico,
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });
    this.listarPacientes();
    this.listarMedicos();
    this.listarEspecialidad();
    this.listarExamenes();

    this.pacientesFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val) ));
    this.medicosFiltrados = this.myControlMedico.valueChanges.pipe( map( val => this.filtrarMedicos(val) ));
    this.especialidadesFiltrados = this.myControlEspecialidad.valueChanges.pipe( map( val => this.filtrarEspecialidad(val)) );
  }

  filtrarEspecialidad(val: any){
    if(val != null && val.idEspecialidad > 0){
        return this.especialidades.filter(v => v.nombre.toLowerCase());
    }
    return this.especialidades.filter(v => v.nombre.toLowerCase().includes(val.toLowerCase()));
  }

  filtrarMedicos(val: any){
    if(val != null && val.idMedico > 0 ){
      return this.medicos.filter(v => 
        v.nombres.toLowerCase().includes( val.nombres.toLowerCase()) || v.apellidos.toLowerCase().includes(v.apellidos.toLowerCase()) );
    }
    return this.medicos.filter(v => v.nombres.toLowerCase().includes(val.toLowerCase()));
  }

  filtrarPacientes(val: any){
    if(val != null && val.idPaciente > 0){
      return this.pacientes.filter(valor => 
        valor.nombres.toLowerCase().includes( val.nombres.toLowerCase() ) || valor.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || valor.dni.toLowerCase().includes(val.dni.toLowerCase())
      );
    }
    return this.pacientes.filter(valor => valor.nombres.toLowerCase().includes(val.toLowerCase()));
  }

  aceptar() {

  }

  listarPacientes(){
    this.serviPaciente.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarMedicos(){
    this.serviMedico.listar().subscribe(data => {
      this.medicos = data;
    });
  }
  
  listarEspecialidad(){
    this.serviEspecia.listar().subscribe(data =>{
      this.especialidades = data;
    });
  }

  listarExamenes(){
    this.serviExam.listar().subscribe(data =>{
      this.examenes = data;
    });
  }

  mostrarEspecialidad(valor: Especialidad){
    return valor ? `${valor.nombre}` : valor;
  }

  seleccionarEspecialidad(e: any){
    this.especialidadSeleccionado = e.option.value;
  }

  mostrarPaciente(valor: Paciente){
    return valor ? `${valor.nombres} ${valor.apellidos}` : valor;
  }

  seleccionarPaciente(e: any){
    this.pacienteSeleccionado = e.option.value;
  }

  mostrarMedico(valor: Medico){
    return valor ? `${valor.nombres} ${valor.apellidos}` : valor;
  }

  seleccionarMedico(e: any){
    this.medicoSeleccionado = e.option.value;
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
    exa = this.examenSeleccionado;
    this.examenSeleccionados.push(exa);
  }

  removerExamen(index: number){
    this.examenSeleccionados.splice(index,1);
  }



}
