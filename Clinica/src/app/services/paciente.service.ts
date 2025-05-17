import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Paciente } from '../models/paciente.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = 'http://localhost:3000/api/v1/pacientes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<Paciente[]> {
    console.log('Servicio - Obteniendo lista de pacientes');
    return this.http.get<Paciente[]>(this.apiUrl)
      .pipe(
        tap(data => console.log('Pacientes recibidos:', data)),
        catchError(this.handleError)
      );
  }

  getPacienteById(id: number): Observable<Paciente> {
    console.log(`Servicio - Obteniendo paciente con ID: ${id}`);
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(data => console.log('Paciente recibido:', data)),
        catchError(this.handleError)
      );
  }

  agregarPaciente(paciente: Paciente): Observable<Paciente> {
    console.log('Servicio - Agregando paciente:', paciente);
    let pacienteToSend: any;
    
    if (paciente.id === 0) {
      const { id, ...rest } = paciente;
      pacienteToSend = rest;
    } else {
      pacienteToSend = { ...paciente };
    }
    
    console.log('Paciente preparado para enviar:', pacienteToSend);
    
    return this.http.post<Paciente>(this.apiUrl, pacienteToSend, this.httpOptions)
      .pipe(
        tap(data => console.log('Respuesta al agregar paciente:', data)),
        catchError(this.handleError)
      );
  }
  
  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    console.log(`Servicio - Actualizando paciente con ID: ${paciente.id}`, paciente);
    return this.http.put<Paciente>(`${this.apiUrl}/${paciente.id}`, paciente, this.httpOptions)
      .pipe(
        tap(data => console.log('Respuesta al actualizar paciente:', data)),
        catchError(this.handleError)
      );
  }
  
  eliminarPaciente(id: number): Observable<any> {
    console.log(`Servicio - Eliminando paciente con ID: ${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(data => console.log('Respuesta al eliminar paciente:', data)),
        catchError(this.handleError)
      );
  }
  
    private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición HTTP:', error);
    
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}