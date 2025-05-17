const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PacienteService {
  constructor() {}

  async create(data) {
    try {
      let fechaISO = data.fechanacimiento;
      if (fechaISO) {
        if (fechaISO instanceof Date) {
          fechaISO = fechaISO.toISOString();
        } else if (typeof fechaISO === "string" && !fechaISO.endsWith("Z")) {
          const dateObj = new Date(fechaISO);
          if (!isNaN(dateObj)) {
            fechaISO = dateObj.toISOString();
          }
        }
      } else {
        throw new Error(
          "El campo fechanacimiento es obligatorio y debe tener formato ISO-8601."
        );
      }

      const paciente = await prisma.paciente.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          fechanacimiento: fechaISO,
          email: data.email,
        },
      });
      return paciente;
    } catch (error) {
      throw new Error("Error creating paciente: " + error.message);
    }
  }

  async getAll() {
    try {
      const pacientes = await prisma.paciente.findMany();
      return pacientes;
    } catch (error) {
      throw new Error("Error fetching pacientes: " + error.message);
    }
  }

  async getById(id) {
    try {
      const paciente = await prisma.paciente.findUnique({
        where: { id: id },
      });
      if (!paciente) {
        throw new Error("Paciente not found");
      }
      return paciente;
    } catch (error) {
      throw new Error("Error fetching paciente: " + error.message);
    }
  }

  async update(id, data) {
    try {
      let fechaISO = data.fechanacimiento;
      if (fechaISO) {
        if (fechaISO instanceof Date) {
          fechaISO = fechaISO.toISOString();
        } else if (typeof fechaISO === "string" && !fechaISO.endsWith("Z")) {
          const dateObj = new Date(fechaISO);
          if (!isNaN(dateObj)) {
            fechaISO = dateObj.toISOString();
          }
        }
      } else {
        throw new Error(
          "El campo fechanacimiento es obligatorio y debe tener formato ISO-8601."
        );
      }

      const paciente = await prisma.paciente.update({
        where: { id: Number(id) },
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          fechanacimiento: fechaISO,
          email: data.email,
        },
      });
      return paciente;
    } catch (error) {
      throw new Error("Error updating paciente: " + error.message);
    }
  }

  async delete(id) {
    try {
      await prisma.cita.deleteMany({
        where: { idpaciente: Number(id) },
      });
      const paciente = await prisma.paciente.delete({
        where: { id: Number(id) },
      });
      return paciente;
    } catch (error) {
      throw new Error("Error deleting paciente: " + error.message);
    }
  }
}

module.exports = PacienteService;