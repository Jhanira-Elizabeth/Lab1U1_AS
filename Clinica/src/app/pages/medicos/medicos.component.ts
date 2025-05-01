import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent {
  medicos: Medico[] = [];
  nuevoMedico: Medico = {
    id: 0,
    nombre: '',
    especialidad: '',
    email: ''
  };

  constructor(private medicoService: MedicoService) {}

  ngOnInit() {
    this.medicoService.getMedicos().subscribe(data => {
      this.medicos = data;
    });
  }

  agregarMedico() {
    this.medicoService.agregarMedico(this.nuevoMedico).subscribe(medico => {
      this.medicos.push(medico);
      this.nuevoMedico = { id: 0, nombre: '', especialidad: '', email: '' };
    });
  }
}
