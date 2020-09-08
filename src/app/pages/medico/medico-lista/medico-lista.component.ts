import { MedicoEditarComponent } from './../medico-editar/medico-editar.component';
import { MedicoService } from './../../../_service/medico.service';
import { Medico } from './../../../_model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medico-lista',
  templateUrl: './medico-lista.component.html',
  styleUrls: ['./medico-lista.component.css']
})
export class MedicoListaComponent implements OnInit {
  
  dataSource: MatTableDataSource<Medico>;

  displayedColumns: string[] = ['idMedico','nombres','apellidos','cmp','fotoUrl','acciones'];
  @ViewChild(MatPaginator) paginador: MatPaginator;

  constructor(private servMedico: MedicoService,  private snackBart: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.servMedico.medicoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });

    this.servMedico.mensaje.subscribe(data =>{
      this.snackBart.open(data, 'AVISO',{
        duration: 2000
      })
    });

    //METODO QUE PERMITE TRAER TODOS LOS MEDICOS
    this.servMedico.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginador;
    });
  }

  applyFilter(valor: string) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(id: number) {
    this.servMedico.eliminar(id).subscribe( () =>{
      this.servMedico.listar().subscribe(data =>{
        this.servMedico.medicoCambio.next(data);
        this.servMedico.mensaje.next('SE ELIMINO');
      });
    });

  }

  abrirDialogo(medico?: Medico) {
    let med = medico != null ? medico : new Medico(); 
    this.dialog.open(MedicoEditarComponent,{
      width:'300px',data:  med
    })
  }

}
