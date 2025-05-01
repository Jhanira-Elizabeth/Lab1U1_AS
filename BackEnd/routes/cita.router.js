const express = require('express');
const CitaService = require('../service/cita.service');
const router = express.Router();
const service = new CitaService();

router.get('/', async (req, res) => {
    try {
        const citas = await service.getAll();
        res.json(citas);
    } catch (error) {
        console.error('Error fetching citas:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cita = await service.getById(id);
        if (!cita) {
            return res.status(404).json({ error: 'Cita not found' });
        }
        res.json(cita);
    } catch (error) {
        console.error('Error fetching cita:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCita = req.body;
        const createdCita = await service.create(newCita);
        res.status(201).json(createdCita);
    } catch (error) {
        console.error('Error creating cita:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCita = req.body;
        const cita = await service.update(id, updatedCita);
        if (!cita) {
            return res.status(404).json({ error: 'Cita not found' });
        }
        res.json(cita);
    } catch (error) {
        console.error('Error updating cita:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCita = await service.delete(id);
        if (!deletedCita) {
            return res.status(404).json({ error: 'Cita not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting cita:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;