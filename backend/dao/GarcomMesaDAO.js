const mysql = require('mysql2/promise');
const GarcomMesa = require('../model/GarcomMesa');

class GarcomMesaDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async associarGarcomMesa(idGarcom, idMesa) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO garcom_mesa (id_garcom, id_mesa) VALUES (?, ?)';
      await connection.execute(query, [idGarcom, idMesa]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao associar garçom à mesa: ' + error.message);
    }
  }

  async listarMesasPorGarcom(idGarcom) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute(
        'SELECT id_mesa FROM garcom_mesa WHERE id_garcom = ?',
        [idGarcom]
      );
      connection.end();
      return rows.map(r => r.id_mesa);
    } catch (error) {
      throw new Error('Erro ao listar mesas do garçom: ' + error.message);
    }
  }

  async removerAssociacao(idGarcom, idMesa) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute(
        'DELETE FROM garcom_mesa WHERE id_garcom = ? AND id_mesa = ?',
        [idGarcom, idMesa]
      );
      connection.end();
    } catch (error) {
      throw new Error('Erro ao remover associação: ' + error.message);
    }
  }
}

module.exports = GarcomMesaDAO;
