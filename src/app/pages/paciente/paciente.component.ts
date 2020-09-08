import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'dni','direccion','telefono','acciones'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginador: MatPaginator;

  constructor(private serviPaci: PacienteService, private snackBart: MatSnackBar) { }

  ngOnInit(): void {
    
    this.serviPaci.pacienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginador;
    });

    this.serviPaci.mensajeCambio.subscribe( data => {
      this.snackBart.open(data, 'AVISO',{
        duration: 2000
      })
    } );
    
    this.serviPaci.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginador;
    });
  }

  filtrar(valor: String) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(id: number) {
    this.serviPaci.eliminar(id).subscribe( () => {
      this.serviPaci.listar().subscribe( data => {
        this.serviPaci.pacienteCambio.next(data);
        this.serviPaci.mensajeCambio.next('SE ELIMINO');
      });
    });
  }

}
