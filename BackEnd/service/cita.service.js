const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CitaService {
  constructor() {}

  async create(data) {
    try {
      const cita = await prisma.cita.create({
        data: {
          IdMedico: data.IdMedico,
          IdPaciente: data.IdPaciente,
          fechaHora: data.fechaHora,
          motivo: data.motivo,
        },
      });
      return cita;
    } catch (error) {
      throw new Error("Error creating cita: " + error.message);
    }
  }

  async getAll() {
    try {
      const citas = await prisma.cita.findMany();
      return citas;
    } catch (error) {
      throw new Error("Error fetching citas: " + error.message);
    }
  }

  async getById(id) {
    try {
      const cita = await prisma.cita.findUnique({
        where: { id: id },
      });
      if (!cita) {
        throw new Error("Cita not found");
      }
      return cita;
    } catch (error) {
      throw new Error("Error fetching cita: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const cita = await prisma.cita.update({
        where: { id: id },
        data: {
          IdMedico: data.IdMedico,
          IdPaciente: data.IdPaciente,
          fechaHora: data.fechaHora,
          motivo: data.motivo,
        },
      });
      return cita;
    } catch (error) {
      throw new Error("Error updating cita: " + error.message);
    }
  }

  async delete(id) {
    try {
      const cita = await prisma.cita.delete({
        where: { id: id },
      });
      return cita;
    } catch (error) {
      throw new Error("Error deleting cita: " + error.message);
    }
  }
}

module.exports = CitaService;