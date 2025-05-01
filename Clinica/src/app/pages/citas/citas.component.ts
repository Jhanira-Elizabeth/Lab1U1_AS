import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';
import { PacienteService } from '../../services/paciente.service';
import { MedicoService } from '../../services/medico.service';
import { Cita } from '../../models/cita.model';
import { Paciente } from '../../models/paciente.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent {
  citas: Cita[] = [];
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];

  nuevaCita: Cita = {
    id: 0,
    idPaciente: 0,
    idMedico: 0,
    fechaHora: '',
    motivo: ''
  };

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService
  ) {}

  ngOnInit() {
    this.citaService.getCitas().subscribe(data => this.citas = data);
    this.pacienteService.getPacientes().subscribe(data => this.pacientes = data);
    this.medicoService.getMedicos().subscribe(data => this.medicos = data);
  }

  agregarCita() {
    this.citaService.agregarCita(this.nuevaCita).subscribe(cita => {
      this.citas.push(cita);
      this.nuevaCita = { id: 0, idPaciente: 0, idMedico: 0, fechaHora: '', motivo: '' };
    });
  }

  getNombrePaciente(id: number): string {
    const paciente = this.pacientes.find(p => p.id === id);
    return paciente ? `${paciente.nombre} ${paciente.apellido}` : 'Desconocido';
  }
  
  getNombreMedico(id: number): string {
    const medico = this.medicos.find(m => m.id === id);
    return medico ? medico.nombre : 'Desconocido';
  }
  eliminarCita(id: number) {
    this.citaService.eliminarCita(id).subscribe(() => {
      this.citas = this.citas.filter(cita => cita.id !== id);
    });
  }
  editarCita(cita: Cita) {
    this.nuevaCita = { ...cita };  

}
}