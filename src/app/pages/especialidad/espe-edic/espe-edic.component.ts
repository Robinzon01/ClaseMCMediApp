import { switchMap } from 'rxjs/operators';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { Especialidad } from './../../../_model/especialidad';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-espe-edic',
  templateUrl: './espe-edic.component.html',
  styleUrls: ['./espe-edic.component.css']
})
export class EspeEdicComponent implements OnInit {
  form: FormGroup;
  especialidad: Especialidad;

  constructor(private serviEspe: EspecialidadService,
    private dialogReg: MatDialogRef<Especialidad>,
    @Inject(MAT_DIALOG_DATA) private data: Especialidad ) { }

  ngOnInit(): void {
    this.especialidad = this.data;
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });
    this.cargarDatos();
  }

  cargarDatos(){
    this.form = new FormGroup({
      'id': new FormControl(this.especialidad.idEspecialidad),
      'nombre': new FormControl(this.especialidad.nombre),
      'descripcion': new FormControl(this.especialidad.descripcion)
    });
  }

  operar(){
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.form.value['id'];
    especialidad.nombre = this.form.value['nombre'];
    especialidad.descripcion = this.form.value['descripcion'];
    if(especialidad != null && especialidad.idEspecialidad >0){
      this.serviEspe.modificar(especialidad).pipe(switchMap(() =>{
        return this.serviEspe.listar();
      })).subscribe( valor => {
        this.serviEspe.espaciadadCambio.next(valor);
        this.serviEspe.mensaje.next('SE MODIFICO LA ESPECIALIDAD');
      });
    }else{
      this.serviEspe.registrar(especialidad).pipe(switchMap( () => {
        return this.serviEspe.listar();
      })).subscribe(valor => {
        this.serviEspe.espaciadadCambio.next(valor);
        this.serviEspe.mensaje.next('SE REGISTRO LA ESPECIALIDAD');
      });
    }
    this.cerrarModal();
  }

  cerrarModal(){
    this.dialogReg.close();
  }

}
