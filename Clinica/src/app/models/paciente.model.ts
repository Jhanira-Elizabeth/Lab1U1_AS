export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: string; // o Date si lo vas a convertir
    email?: string;
  }