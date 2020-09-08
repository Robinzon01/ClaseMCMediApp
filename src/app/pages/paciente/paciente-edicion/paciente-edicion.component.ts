import { Paciente } from './../../../_model/paciente';
import { PacienteService } from './../../../_service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup;
  constructor(private router: ActivatedRoute,
              private navegar: Router,
              private servPaci: PacienteService) { }
  id: number;
  edicion: boolean;

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl(''),
      'email': new FormControl('')
    });

    this.router.params.subscribe((data: Params) => {
      //console.log(data['id']);
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion) {
      this.servPaci.listarId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'direccion': new FormControl(data.direccion),
          'email': new FormControl(data.email)
        });
      });
    }
  }

  operar() {
    let persona = new Paciente();
    persona.idPaciente = this.form.value['id'];
    persona.nombres = this.form.value['nombres'];
    persona.apellidos = this.form.value['apellidos'];
    persona.dni = this.form.value['dni'];
    persona.telefono = this.form.value['telefono'];
    persona.direccion = this.form.value['direccion'];
    persona.email = this.form.value['email'];

    if(this.edicion) {
      this.servPaci.modificar(persona).subscribe(() => {
        this.servPaci.listar().subscribe( data => {
          this.servPaci.pacienteCambio.next(data);
          this.servPaci.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else {
      this.servPaci.registrar(persona).subscribe( () => {
        this.servPaci.listar().subscribe( data => {
          this.servPaci.pacienteCambio.next(data);
          this.servPaci.mensajeCambio.next('SE REGISTRO');
        });
      } );
    }
    this.navegar.navigate(['paciente']);
  }

}
