import bcrypt from "bcrypt";
import { validate } from "gerador-validador-cpf";
import mysql from "mysql2/promise";

const saltRounds = 10;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res
      .status(405)
      .setHeader("Allow", ["POST"])
      .json({ error: "Método não permitido" });
    return;
  }

  const { cpf, fullName, email, password } = req.body;

  if (!validate(cpf)) {
    return res.status(400).json({ error: "CPF inválido" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const connection = await mysql.createConnection({
      host: "mysql",
      user: "admin",
      password: "root123",
      database: "app_db",
    });

    // verifica se o CPF ta no db
    const [cpfResult] = await connection.execute(
      "SELECT * FROM app WHERE document = ?",
      [cpf]
    );

    if (cpfResult.length > 0) {
      await connection.end();
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // verifica se o e-mail ta no db
    const [emailResult] = await connection.execute(
      "SELECT * FROM app WHERE mail = ?",
      [email]
    );

    if (emailResult.length > 0) {
      await connection.end();
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // registra no db
    const [rows] = await connection.execute(
      "INSERT INTO app (UserType, document, name, mail, pass) VALUES (?, ?, ?, ?, ?)",
      [0, cpf, fullName, email, hashedPassword]
    );

    // Fecha a conexão
    await connection.end();

    res.status(200).json({ message: "Registro bem-sucedido!" });
  } catch (error) {
    console.error("Erro ao salvar usuário no banco de dados", error);
    res.status(500).json({ error: "Erro ao salvar usuário no banco de dados" });
  }
}
