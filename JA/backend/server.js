const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: "postgres",        // Usuário do PostgreSQL
    host: "localhost",       // Servidor do banco de dados
    database: "JA",   // Nome do banco de dados
    password: "123",   // Senha do PostgreSQL
    port: 5432,              // Porta padrão do PostgreSQL
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());




app.post("/cargos", async (req, res) => {
  console.log("📩 Dados recebidos no backend:", req.body);
  const { descCargo, vlrCusto, vlrVenda} = req.body;

  // Verificação de dados obrigatórios
  if (!descCargo || !vlrCusto || !vlrVenda) {
      console.log("❌ Campos faltando!");
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
  }

  try {
      console.log("🔄 Passando para o Banco :", { descCargo, vlrCusto, vlrVenda});

      // Inserindo dados na tabela "cargo"
      const result = await pool.query(
          "INSERT INTO cargos (descCargo, vlrCusto, vlrVenda) VALUES ($1, $2, 3$) RETURNING *",
          [descCargo, vlrCusto, vlrVenda]
      );

      console.log("✅ Dados inseridos com sucesso:", result.rows[0]);
      res.json({success: true, data: result.rows[0]});

  } catch (error) {
      console.error("❌ Erro ao inserir no banco:", error);
      res.status(500).json({ success: false, message: "Erro ao salvar no banco" });
  }
});


app.post("/eventos", async (req, res) => {
  console.log("📩 Dados recebidos no backend:", req.body);
  const { nmEvento} = req.body;

  // Verificação de dados obrigatórios
  if (!nmEvento) {
      console.log("❌ Campos faltando!");
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
  }

  try {
      console.log("🔄 Passando para o Banco :", { nmEvento});

      // Inserindo dados na tabela "cargo"
      const result = await pool.query(
          "INSERT INTO eventos (nmEvento) VALUES ($1) RETURNING *",
          [nmEvento]
      );

      console.log("✅ Dados inseridos com sucesso:", result.rows[0]);
      res.json({success: true, data: result.rows[0]});

  } catch (error) {
      console.error("❌ Erro ao inserir no banco:", error);
      res.status(500).json({ success: false, message: "Erro ao salvar no banco" });
  }
});




// Rota para receber os dados do formulário
app.post("/clientes", async (req, res) => {
    console.log("📩 Dados recebidos no backend:", req.body);
    const { nome_fantasia, razao_social, cnpj, nome_responsavel, celContato, email, email_nfe, site, inscEstadual, cep, rua, numero, complemento, bairro, cidade, estado, pais } = req.body;

    // Verificação de dados obrigatórios
    if (!nome_fantasia || !razao_social || !cnpj || !nome_responsavel || !celContato || !email || !email_nfe || !inscEstadual || !cep || !rua || !numero || !bairro || !cidade || !estado || !pais) {
        console.log("❌ Campos faltando!");
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
    }

    try {
        console.log("🔄 Passando para o Banco :", { nome_fantasia, razao_social, cnpj, nome_responsavel, celContato, email, email_nfe, site, inscEstadual, cep, rua, numero, complemento, bairro, cidade, estado, pais });

        // Inserindo dados na tabela "cargo"
        const result = await pool.query(
            "INSERT INTO clientes (nmfantasia, razaosocial, cnpj, nmcontato, celcontato, email, emailnfe, site, inscestadual, cep, rua, numero, complemento, bairro, cidade, estado, pais) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *",
            [nome_fantasia, razao_social, cnpj, nome_responsavel, celContato, email, email_nfe, site, inscEstadual, cep, rua, numero, complemento, bairro, cidade, estado, pais]
        );

        console.log("✅ Dados inseridos com sucesso:", result.rows[0]);
        res.json({success: true, data: result.rows[0]});

    } catch (error) {
        console.error("❌ Erro ao inserir no banco:", error);
        res.status(500).json({ success: false, message: "Erro ao salvar no banco" });
    }
});

// Retornar lista de clientes
app.get('/api/:tipo', async (req, res) => {
  const { tipo } = req.params;

  try {
    let resultado;

    if (tipo === 'clientes') {
      resultado = await pool.query('SELECT id, nmfantasia FROM clientes');
      console.log("✅  clientes mostrando com sucesso", );
      res.json({ success: true, data: resultado.rows });

    } else if (tipo === 'eventos') {
      resultado = await pool.query('SELECT id, titulo FROM eventos');
      console.log("✅ Eventos mostrando com sucesso");
      res.json({ success: true, data: resultado.rows });

    } else {
      return res.status(400).json({ erro: 'Tipo inválido' });
    }

  } catch (err) {
    console.error(`Erro ao buscar ${tipo}:`, err);
    res.status(500).json({ erro: `Erro ao buscar ${tipo}` });
  }
});





// app.post("/funcionarios_internos", async (req, res) => {
//     const { Foto, Nome, Cpf, Rg, Celular, Email, Cep, Bairro, Rua, Numero, Cidade, Estado } = req.body;

//     // Verificação de dados obrigatórios
//     if (!Foto || !Nome || !Cpf || !Rg || !Celular || !Email || !Cep || !Bairro || !Rua || !Numero || !Cidade || !Estado) {
//         return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
//     }

//     try {
//         console.log("🔄 Recebendo dados:", { Foto, Nome, Cpf, Rg, Celular, Email, Cep, Bairro, Rua, Numero, Cidade, Estado });

//         // Inserindo dados na tabela "cargo"
//         const result = await pool.query(
//             "INSERT INTO funcionarios_internos (Foto, Nome, Cpf, Rg, Celular, Email, Cep, Bairro, Rua, Numero, Cidade, Estado) VALUES ($1, $2, $3) RETURNING *",
//             [Foto, Nome, Cpf, Rg, Celular, Email, Cep, Bairro, Rua, Numero, Cidade, Estado]
//         );

//         res.json({success: true, data: result.rows[0]});
//         console.log("✅ Dados inseridos com sucesso:", result.rows[0]);
//         res.json({ success: true, data: result.rows[0] });

//     } catch (error) {
//         console.error("❌ Erro ao inserir no banco:", error);
//         res.status(500).json({ success: false, message: "Erro ao salvar no banco" });
//     }
// });

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
