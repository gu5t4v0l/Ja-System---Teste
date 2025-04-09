app.get('/dados/:tipo', async (req, res) => {
  const tipo = req.params.tipo;

  let query;
  if (tipo === 'clientes') {
    query = 'SELECT nome FROM clientes';
  } else if (tipo === 'eventos') {
    query = 'SELECT nome FROM eventos';
  } else {
    return res.status(400).json({ erro: 'Tipo inválido' });
  }

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar dados' });
  }
});