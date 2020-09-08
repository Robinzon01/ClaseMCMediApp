import { switchMap } from 'rxjs/operators';
import { Examen } from './../../../_model/examen';
import { ExamenService } from './../../../_service/examen.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {
  form: FormGroup;
  examen: Examen;

  constructor(private serviExa: ExamenService,
    private dialogReg: MatDialogRef<ExamenEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Examen
    ) { }

  ngOnInit(): void {
    this.examen = this.data;
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });
    this.cargarDataModal();
  }

  cargarDataModal(){
     this.form = new FormGroup({
       'id': new FormControl(this.examen.idExamen),
       'nombre': new FormControl(this.examen.nombre),
       'descripcion': new FormControl(this.examen.descripcion)
     });
  }

  operar(){
    let examen = new Examen();
    examen.idExamen = this.form.value['id'];
    examen.nombre = this.form.value['nombre'];
    examen.descripcion = this.form.value['descripcion'];
    if(examen != null && examen.idExamen > 0){
      this.serviExa.modificar(examen).pipe(switchMap( () => {
        return this.serviExa.listar();
      } )).subscribe( valor => {
        this.serviExa.examenCambio.next(valor);
        this.serviExa.mensaje.next('SE MODIFICO EL EXAMEN');
      } );
    }else{
      this.serviExa.registrar(examen).pipe(switchMap( () => {
        return this.serviExa.listar();
      })).subscribe(valor => {
        this.serviExa.examenCambio.next(valor);
        this.serviExa.mensaje.next('SE REGISTRO EL NUEVO EXAMEN');
      });
    }
    this.cerrarModal();
  }

  cerrarModal(){
    this.dialogReg.close();
  }

}
