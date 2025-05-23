const GarcomMesaService = require('../service/GarcomMesaService');

class GarcomMesaController {
  constructor(dbConfig) {
    this.garcomMesaService = new GarcomMesaService(dbConfig);
  }

  associar = async (req, res) => {
    try {
      const { idGarcom, idMesa } = req.params;
      await this.garcomMesaService.associar(idGarcom, idMesa);
      res.status(201).json({ message: 'Garçom associado à mesa com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  listarMesas = async (req, res) => {
    try {
      const { idGarcom } = req.params;
      const mesas = await this.garcomMesaService.listarMesasPorGarcom(idGarcom);
      res.status(200).json(mesas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  remover = async (req, res) => {
    try {
      const { idGarcom, idMesa } = req.params;
      await this.garcomMesaService.removerAssociacao(idGarcom, idMesa);
      res.status(200).json({ message: 'Associação removida com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = GarcomMesaController;
