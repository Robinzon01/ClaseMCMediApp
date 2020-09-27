import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicoEditarComponent } from './pages/medico/medico-editar/medico-editar.component';
import { MedicoListaComponent } from './pages/medico/medico-lista/medico-lista.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspeEdicComponent } from './pages/especialidad/espe-edic/espe-edic.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import {FormsModule} from '@angular/forms';
import { ConsultaEspecialComponent } from './pages/consulta/consulta-especial/consulta-especial.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    MedicoComponent,
    PacienteEdicionComponent,
    MedicoEditarComponent,
    MedicoListaComponent,
    ExamenComponent,
    ExamenEdicionComponent,
    EspecialidadComponent,
    EspeEdicComponent,
    ConsultaComponent,
    ConsultaEspecialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
