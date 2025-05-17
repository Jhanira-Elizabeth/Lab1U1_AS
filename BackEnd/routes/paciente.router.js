const express = require('express');
const PacienteService = require('../service/paciente.service');
const router = express.Router();
const service = new PacienteService();

router.get('/', async (req, res) => {
    try {
        const pacientes = await service.getAll();
        res.json(pacientes);
    } catch (error) {
        console.error('Error fetching pacientes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await service.getById(id);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente not found' });
        }
        res.json(paciente);
    } catch (error) {
        console.error('Error fetching paciente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newPaciente = req.body;
        const createdPaciente = await service.create(newPaciente);
        res.status(201).json(createdPaciente);
    } catch (error) {
        console.error('Error creating paciente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPaciente = req.body;
        console.log('Datos recibidos para actualizar:', updatedPaciente);

        if (!updatedPaciente.nombre || !updatedPaciente.apellido || !updatedPaciente.fechanacimiento) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const paciente = await service.update(id, updatedPaciente);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente not found' });
        }
        res.json(paciente);
    } catch (error) {
        console.error('Error updating paciente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPaciente = await service.delete(id);
        if (!deletedPaciente) {
            return res.status(404).json({ error: 'Paciente not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting paciente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;