import { ConsultaEspecialComponent } from './pages/consulta/consulta-especial/consulta-especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { MedicoListaComponent } from './pages/medico/medico-lista/medico-lista.component';

import { MedicoComponent } from './pages/medico/medico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { MedicoEditarComponent } from './pages/medico/medico-editar/medico-editar.component';

const routes: Routes = [
  {
    path:'paciente', component: PacienteComponent,
    children:[
      {path:"nuevo", component: PacienteEdicionComponent},
      {path:"edicion/:id", component: PacienteEdicionComponent}
    ]
  },
  {
    path:'examen', component: ExamenComponent
  },
  {
    path:'especialidad', component: EspecialidadComponent
  },
  {path:'consulta', component: ConsultaComponent},
  {path:'consulta-especial', component: ConsultaEspecialComponent},
  {path:'medico', component: MedicoComponent,
    children:[
      {path:"", component: MedicoListaComponent},
      {path:"nuevo", component: MedicoEditarComponent},
      {path:"editar/:id", component: MedicoEditarComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
