const express = require('express');
const pacientesRouter = require('./paciente.router');
const medicosRouter = require('./medico.router');
const citasRouter = require('./cita.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/pacientes', pacientesRouter);
    router.use('/medicos', medicosRouter);
    router.use('/citas', citasRouter);
}

module.exports = routerApi;