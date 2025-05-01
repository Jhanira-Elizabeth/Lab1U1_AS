import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private medicos: Medico[] = [
    {
      id: 1,
      nombre: 'Dra. Lucía Salazar',
      especialidad: 'Pediatría',
      email: 'lucia.salazar@hospital.com'
    }
  ];

  getMedicos(): Observable<Medico[]> {
    return of(this.medicos);
  }

  getMedicoById(id: number): Observable<Medico | undefined> {
    return of(this.medicos.find(m => m.id === id));
  }

  agregarMedico(medico: Medico): Observable<Medico> {
    medico.id = this.medicos.length + 1;
    this.medicos.push(medico);
    return of(medico);
  }
}
