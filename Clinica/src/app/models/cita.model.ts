export interface Cita {
    id: number;
    idPaciente: number;
    idMedico: number;
    fechaHora: string; // o Date
    motivo?: string;
  }