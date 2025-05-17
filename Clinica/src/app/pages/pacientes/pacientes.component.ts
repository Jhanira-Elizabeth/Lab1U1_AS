import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [PacienteService],
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
    fechanacimiento: new Date(),
    email: ''
  };
  
  editando: boolean = false;
  pacienteEditando: Paciente | null = null;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data.map(p => ({
          ...p,
          fechanacimiento: p.fechanacimiento ? new Date(p.fechanacimiento) : ''
        }));
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
        alert('Error al cargar la lista de pacientes: ' + this.getErrorMessage(error));
      }
    });
  }

  agregarPaciente(): void {
    if (this.validarFormulario() === false) {
      console.error('Formulario inválido, no se puede enviar');
      alert('Por favor, complete todos los campos requeridos correctamente.');
      return;
    }
    
    console.log('Formulario enviado - Datos:', this.nuevoPaciente);
    
    if (this.editando && this.pacienteEditando) {
      const pacienteActualizado = {
        ...this.nuevoPaciente,
        fechanacimiento: this.nuevoPaciente.fechanacimiento instanceof Date ? 
          this.nuevoPaciente.fechanacimiento.toISOString() : this.nuevoPaciente.fechanacimiento
      };

      console.log('Actualizando paciente:', pacienteActualizado);
      
      this.pacienteService.actualizarPaciente(pacienteActualizado).subscribe({
        next: (response) => {
          console.log('Paciente actualizado con éxito:', response);
          this.cargarPacientes();
          this.limpiarFormulario();
          alert('Paciente actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar paciente:', error);
          alert('Error al actualizar el paciente: ' + this.getErrorMessage(error));
        }
      });
    } else {
      const pacienteParaEnviar = {
        ...this.nuevoPaciente,
        fechanacimiento: this.nuevoPaciente.fechanacimiento instanceof Date ? 
          this.nuevoPaciente.fechanacimiento.toISOString() : this.nuevoPaciente.fechanacimiento
      };

      console.log('Enviando nuevo paciente:', pacienteParaEnviar);
      
      this.pacienteService.agregarPaciente(pacienteParaEnviar).subscribe({
        next: (paciente) => {
          console.log('Paciente agregado con éxito:', paciente);
          if (!paciente || !paciente.id) {
            console.log('Recargando lista completa de pacientes');
            this.cargarPacientes();
          } else {
            this.pacientes.push({
              ...paciente,
              fechanacimiento: new Date(paciente.fechanacimiento)
            });
          }

          this.limpiarFormulario();
          alert('Paciente agregado correctamente');
        },
        error: (error) => {
          console.error('Error al agregar paciente:', error);
          alert('Error al agregar el paciente: ' + this.getErrorMessage(error));
        }
      });
    }
  }
  
  // Método para validar el formulario manualmente
  validarFormulario(): boolean {
    if (!this.nuevoPaciente.nombre || this.nuevoPaciente.nombre.trim() === '') {
      console.error('Nombre inválido');
      return false;
    }
    if (!this.nuevoPaciente.apellido || this.nuevoPaciente.apellido.trim() === '') {
      console.error('Apellido inválido');
      return false;
    }
    if (!this.nuevoPaciente.cedula || this.nuevoPaciente.cedula.trim() === '') {
      console.error('Cédula inválida');
      return false;
    }
    if (!this.nuevoPaciente.fechanacimiento) {
      console.error('Fecha de nacimiento inválida');
      return false;
    }
    if (!this.nuevoPaciente.email || !this.isValidEmail(this.nuevoPaciente.email)) {
      console.error('Email inválido');
      return false;
    }
    return true;
  }
  
  // Validador de email básico
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  // Obtener mensaje de error legible
  getErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.message) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    }
    return 'Error desconocido en la comunicación con el servidor';
  }

  editarPaciente(paciente: Paciente): void {
    this.editando = true;
    this.pacienteEditando = paciente;
  
    // Cargamos los datos del paciente en el formulario
    this.nuevoPaciente = {
      ...paciente,
      // Asegurarse de que la fecha es un objeto Date
      fechanacimiento: new Date(paciente.fechanacimiento)
    };
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Actualizar Paciente';
    }
    document.querySelector('h3.mt-5')?.scrollIntoView({ behavior: 'smooth' });
  }

  eliminarPaciente(paciente: Paciente): void {
    if (confirm(`¿Está seguro que desea eliminar al paciente ${paciente.nombre} ${paciente.apellido}?`)) {
      console.log('Eliminando paciente con ID:', paciente.id);
      
      this.pacienteService.eliminarPaciente(paciente.id).subscribe({
        next: () => {
          console.log('Paciente eliminado con éxito');
          // Filtramos el paciente eliminado de la lista local
          this.pacientes = this.pacientes.filter(p => p.id !== paciente.id);
        },
        error: (error) => {
          console.error('Error al eliminar paciente:', error);
          alert('Error al eliminar el paciente. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.nuevoPaciente = {
      id: 0,
      nombre: '',
      apellido: '',
      cedula: '',
      fechanacimiento: new Date(),
      email: ''
    };
    
    this.editando = false;
    this.pacienteEditando = null;
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Agregar Paciente';
    }
  }
}