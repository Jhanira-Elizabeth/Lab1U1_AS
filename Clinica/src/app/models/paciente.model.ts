export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    fechanacimiento: Date | string; // o Date si lo vas a convertir
    email?: string;
  }