import { switchMap } from 'rxjs/operators';
import { EspeEdicComponent } from './espe-edic/espe-edic.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EspecialidadService } from './../../_service/especialidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'descripcion','acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator) paginador: MatPaginator;

  constructor(private servEspe: EspecialidadService,
    private snackBart: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.servEspe.espaciadadCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginador;
    });

    this.servEspe.mensaje.subscribe(valor =>{
      this.snackBart.open(valor, 'AVISO',{duration: 3000})
    });

    this.servEspe.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginador;
    });
  }

  applyFilter(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(especialidad?: Especialidad){
    let espe = especialidad != null ? especialidad : new Especialidad();
    this.dialog.open(EspeEdicComponent,{
      width: '500px',
      data: espe
    });
  }

  eliminar(id: number){
    this.servEspe.eliminar(id).pipe(switchMap( () => {
      return this.servEspe.listar();
    } )).subscribe(data =>{
      this.servEspe.espaciadadCambio.next(data);
    });
  }

}
