import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private citas: Cita[] = [
    {
      id: 1,
      idPaciente: 1,
      idMedico: 1,
      fechaHora: '2025-05-01T10:00:00',
      motivo: 'Consulta general'
    }
  ];

  getCitas(): Observable<Cita[]> {
    return of(this.citas);
  }

  getCitaById(id: number): Observable<Cita | undefined> {
    return of(this.citas.find(c => c.id === id));
  }

  agregarCita(cita: Cita): Observable<Cita> {
    cita.id = this.citas.length + 1;
    this.citas.push(cita);
    return of(cita);
  }
}
