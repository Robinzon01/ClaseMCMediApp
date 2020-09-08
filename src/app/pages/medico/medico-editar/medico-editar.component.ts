import { Medico } from './../../../_model/medico';
import { MedicoService } from './../../../_service/medico.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-medico-editar',
  templateUrl: './medico-editar.component.html',
  styleUrls: ['./medico-editar.component.css']
})
export class MedicoEditarComponent implements OnInit {
  form: FormGroup;

  id: number;
  edicion: boolean;

  medico: Medico;

  constructor(private serviMedico: MedicoService,
             private navegar: Router,
             private router: ActivatedRoute,
             private dialogReg: MatDialogRef<MedicoEditarComponent>,
             @Inject(MAT_DIALOG_DATA) private data: Medico ) { }

  ngOnInit(): void {
    this.medico = this.data;
  
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'cmp': new FormControl(''),
      'fotoUrl': new FormControl('')
    });
    this.cargarDataModal();
    /*
    this.router.params.subscribe((data: Params) =>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargarData();
    });
    */
  }
  cerrarModal() {
    this.dialogReg.close();
  }
  cargarDataModal(){
    this.form = new FormGroup({
      'id': new FormControl(this.medico.idMedico),
      'nombres': new FormControl(this.medico.nombres),
      'apellidos': new FormControl(this.medico.apellidos),
      'cmp': new FormControl(this.medico.cmp),
      'fotoUrl': new FormControl(this.medico.fotoUrl)
    });
  }

  cargarData() {
    if(this.edicion){
      this.serviMedico.listarId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idMedico),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'cmp': new FormControl(data.cmp),
          'fotoUrl': new FormControl(data.fotoUrl)
        });
      });
    }
  }

  operar() {
    let medico = new Medico();
    medico.idMedico = this.form.value['id'];
    medico.nombres = this.form.value['nombres'];
    medico.apellidos = this.form.value['apellidos'];
    medico.cmp = this.form.value['cmp'];
    medico.fotoUrl = this.form.value['fotoUrl'];
    if(medico != null && medico.idMedico > 0){
      this.serviMedico.modificar(medico).pipe(switchMap( () => {
        return this.serviMedico.listar();
      } )).subscribe(valor => {
        this.serviMedico.medicoCambio.next(valor);
      });
      /*
      this.serviMedico.modificar(medico).subscribe( () =>{
         this.serviMedico.listar().subscribe( data => {
           this.serviMedico.medicoCambio.next(data);
           this.serviMedico.mensaje.next('SE REALIZO EL CAMBIO');
         })
       });
      */
    }else{
       this.serviMedico.registrar(medico).subscribe( () => {
         this.serviMedico.listar().subscribe(data =>{
           this.serviMedico.medicoCambio.next(data);
         })
       });
    }
    this.cerrarModal();
    /*
    if (this.edicion) {
        this.serviMedico.modificar(medico).subscribe(() => {
          this.serviMedico.mensaje.next('SE MODIFICO');
        });
    }else{
      this.serviMedico.registrar(medico).subscribe();
    }
    this.navegar.navigate(['medico']);
    */
  }

}
