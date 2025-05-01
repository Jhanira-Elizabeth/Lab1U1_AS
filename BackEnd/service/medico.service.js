const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MedicoService {
  constructor() {}

  async create(data) {
    try {
      const medico = await prisma.medico.create({
        data: {
          nombre: data.nombre,
          especialidad: data.especialidad,
          email: data.email,
        },
      });
      return medico;
    } catch (error) {
      throw new Error("Error creating medico: " + error.message);
    }
  }

  async getAll() {
    try {
      const medicos = await prisma.medico.findMany();
      return medicos;
    } catch (error) {
      throw new Error("Error fetching medicos: " + error.message);
    }
  }

  async getById(id) {
    try {
      const medico = await prisma.medico.findUnique({
        where: { id: id },
      });
      if (!medico) {
        throw new Error("Medico not found");
      }
      return medico;
    } catch (error) {
      throw new Error("Error fetching medico: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const medico = await prisma.medico.update({
        where: { id: id },
        data: {
          nombre: data.nombre,
          especialidad: data.especialidad,
          email: data.email,
        },
      });
      return medico;
    } catch (error) {
      throw new Error("Error updating medico: " + error.message);
    }
  }

  async delete(id) {
    try {
      const medico = await prisma.medico.delete({
        where: { id: id },
      });
      return medico;
    } catch (error) {
      throw new Error("Error deleting medico: " + error.message);
    }
  }
}

module.exports = MedicoService;
