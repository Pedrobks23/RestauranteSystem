const GarcomMesaDAO = require('../dao/GarcomMesaDAO');

class GarcomMesaService {
  constructor(dbConfig) {
    this.garcomMesaDAO = new GarcomMesaDAO(dbConfig);
  }

  async associar(idGarcom, idMesa) {
    return await this.garcomMesaDAO.associarGarcomMesa(idGarcom, idMesa);
  }

  async listarMesasPorGarcom(idGarcom) {
    return await this.garcomMesaDAO.listarMesasPorGarcom(idGarcom);
  }

  async removerAssociacao(idGarcom, idMesa) {
    return await this.garcomMesaDAO.removerAssociacao(idGarcom, idMesa);
  }
}

module.exports = GarcomMesaService;
