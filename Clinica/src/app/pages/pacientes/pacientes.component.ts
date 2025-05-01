import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {
  pacientes: Paciente[] = [];
  nuevoPaciente: Paciente = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    fechaNacimiento: '',
    email: ''
  };

  constructor(private pacienteService: PacienteService) {}

  ngOnInit() {
    this.pacienteService.getPacientes().subscribe(data => {
      this.pacientes = data;
    });
  }

  agregarPaciente() {
    this.pacienteService.agregarPaciente(this.nuevoPaciente).subscribe(paciente => {
      this.pacientes.push(paciente);
      this.nuevoPaciente = { id: 0, nombre: '', apellido: '', cedula: '', fechaNacimiento: '', email: '' };
    });
  }
}
