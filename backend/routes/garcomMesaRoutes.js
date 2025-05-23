const express = require('express');
const GarcomMesaController = require('../controller/GarcomMesaController');

module.exports = (dbConfig) => {
  const router = express.Router();
  const controller = new GarcomMesaController(dbConfig);

  router.post('/:idGarcom/mesas/:idMesa', controller.associar);
  router.get('/:idGarcom/mesas', controller.listarMesas);
  router.delete('/:idGarcom/mesas/:idMesa', controller.remover);

  return router;
};
