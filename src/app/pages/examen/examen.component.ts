import { ExamenEdicionComponent } from './examen-edicion/examen-edicion.component';
import { switchMap } from 'rxjs/operators';
import { ExamenService } from './../../_service/examen.service';
import { Examen } from './../../_model/examen';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  displayedColumns: string[] = ['idExamen', 'nombre', 'descripcion','acciones'];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator) paginador: MatPaginator;

  constructor(private serviExam: ExamenService,
              private snackBart: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    //CUANDO HAY UN CAMBIO EN LA TABLA
    this.serviExam.examenCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginador;
    })
    //MENSAJE
    this.serviExam.mensaje.subscribe(data =>{
      this.snackBart.open(data, 'AVISO',{duration: 3000})
    });

    //VAMOS A LISTAR LOS EXAMENES
    this.serviExam.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginador;
    });
  }
  // BUSCAR UN EXAMEN
  applyFilter(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(id: number){
    this.serviExam.eliminar(id).pipe( switchMap( () => {
      return this.serviExam.listar();
    } ) ).subscribe(data => {
      this.serviExam.examenCambio.next(data);
    });
  }

  abrirDialogo(examen?: Examen){
    let exa = examen != null ? examen : new Examen();
    this.dialog.open(ExamenEdicionComponent,{
      width: '500px',
      data: exa
    })
  }
}
