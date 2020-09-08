import { Especialidad } from './especialidad';
import { Medico } from './medico';
import { Paciente } from './paciente';
import { DetalleConsulta } from './detalle-consulta';

export class Consulta {
    idConsulta: number;
    paciente: Paciente;
    medico: Medico;
    especialidad: Especialidad;
    numConsulta: string;
    fecha: string;
    detalleConsulta: DetalleConsulta[];
}
