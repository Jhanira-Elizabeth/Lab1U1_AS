const express = require('express');
const MedicoService = require('../service/medico.service');
const router = express.Router();
const service = new MedicoService();

router.get('/', async (req, res) => {
    try {
        const medicos = await service.getAll();
        res.json(medicos);
    } catch (error) {
        console.error('Error fetching medicos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await service.getById(id);
        if (!medico) {
            return res.status(404).json({ error: 'Medico not found' });
        }
        res.json(medico);
    } catch (error) {
        console.error('Error fetching medico:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMedico = req.body;
        const createdMedico = await service.create(newMedico);
        res.status(201).json(createdMedico);
    } catch (error) {
        console.error('Error creating medico:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMedico = req.body;
        const medico = await service.update(id, updatedMedico);
        if (!medico) {
            return res.status(404).json({ error: 'Medico not found' });
        }
        res.json(medico);
    } catch (error) {
        console.error('Error updating medico:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMedico = await service.delete(id);
        if (!deletedMedico) {
            return res.status(404).json({ error: 'Medico not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting medico:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;