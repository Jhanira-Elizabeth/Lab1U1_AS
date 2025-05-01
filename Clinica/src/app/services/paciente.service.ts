import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private pacientes: Paciente[] = [
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Gómez',
      cedula: '1104587964',
      fechaNacimiento: '1980-05-20',
      email: 'carlos.gomez@mail.com'
    }
  ];

  getPacientes(): Observable<Paciente[]> {
    return of(this.pacientes);
  }

  getPacienteById(id: number): Observable<Paciente | undefined> {
    return of(this.pacientes.find(p => p.id === id));
  }

  agregarPaciente(paciente: Paciente): Observable<Paciente> {
    paciente.id = this.pacientes.length + 1;
    this.pacientes.push(paciente);
    return of(paciente);
  }
}
