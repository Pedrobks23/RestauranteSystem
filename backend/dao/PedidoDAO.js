const mysql = require('mysql2/promise');
const Pedido = require('../model/Pedido');

class PedidoDAO {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async criarPedido(pedido) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'INSERT INTO pedido (id_mesa, id_garcom, status, data_hora) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [
        pedido.idMesa,
        pedido.idGarcom,
        pedido.status,
        pedido.dataHora
      ]);
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao criar pedido: ' + error.message);
    }
  }

  async listarPedidos() {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM pedido');
      connection.end();
      return rows.map(row =>
        new Pedido(row.id_pedido, row.id_mesa, row.id_garcom, row.status, row.data_hora)
      );
    } catch (error) {
      throw new Error('Erro ao listar pedidos: ' + error.message);
    }
  }

  async buscarPorId(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const [rows] = await connection.execute('SELECT * FROM pedido WHERE id_pedido = ?', [id]);
      connection.end();
      if (rows.length > 0) {
        const row = rows[0];
        return new Pedido(row.id_pedido, row.id_mesa, row.id_garcom, row.status, row.data_hora);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao buscar pedido por ID: ' + error.message);
    }
  }

  async atualizarPedido(pedido) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      const query = 'UPDATE pedido SET id_mesa = ?, id_garcom = ?, status = ?, data_hora = ? WHERE id_pedido = ?';
      await connection.execute(query, [
        pedido.idMesa,
        pedido.idGarcom,
        pedido.status,
        pedido.dataHora,
        pedido.id
      ]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao atualizar pedido: ' + error.message);
    }
  }

  async deletarPedido(id) {
    try {
      const connection = await mysql.createConnection(this.dbConfig);
      await connection.execute('DELETE FROM pedido WHERE id_pedido = ?', [id]);
      connection.end();
    } catch (error) {
      throw new Error('Erro ao deletar pedido: ' + error.message);
    }
  }
  
  async finalizarPedido(idPedido) {
  try {
    const connection = await mysql.createConnection(this.dbConfig);

    // Atualiza status do pedido
    const query1 = 'UPDATE pedido SET status = ? WHERE id_pedido = ?';
    await connection.execute(query1, ['finalizado', idPedido]);

    // Descobre a mesa vinculada
    const [rows] = await connection.execute('SELECT id_mesa FROM pedido WHERE id_pedido = ?', [idPedido]);
    if (rows.length > 0) {
      const idMesa = rows[0].id_mesa;

      // Libera a mesa
      const query2 = 'UPDATE mesa SET status = ? WHERE id_mesa = ?';
      await connection.execute(query2, ['disponivel', idMesa]);
    }

    connection.end();
  } catch (error) {
    throw new Error('Erro ao finalizar pedido: ' + error.message);
  }
}

}



module.exports = PedidoDAO;
