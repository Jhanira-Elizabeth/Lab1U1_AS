const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PacienteService {
  constructor() {}

  async create(data) {
    try {
      const paciente = await prisma.paciente.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          fechanacimiento: data.fechanacimiento,
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
      const paciente = await prisma.paciente.update({
        where: { id: id },
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          fecha_nacimiento: data.fecha_nacimiento,
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
      const paciente = await prisma.paciente.delete({
        where: { id: id },
      });
      return paciente;
    } catch (error) {
      throw new Error("Error deleting paciente: " + error.message);
    }
  }
}

module.exports = PacienteService;