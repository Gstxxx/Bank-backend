import bcrypt from "bcrypt";
import { validate } from "gerador-validador-cpf";
import { checkIfCPFExists } from "../../functions/validate/validateCPF";
import { checkIfEmailExists } from "../../functions/validate/validateEmail";
import { closeConnection } from "../../functions/connection/closeConnection";
import { establishConnection } from "../../functions/connection/openConnection";

async function saveUserToDatabase(
  connection,
  userType,
  cpf,
  fullName,
  email,
  hashedPassword
) {
  const [rows] = await connection.execute(
    "INSERT INTO app (UserType, document, name, mail, pass, SALDO) VALUES (?, ?, ?, ?, ?, ?)",
    [userType, cpf, fullName, email, hashedPassword, 0.0]
  );

  return rows;
}

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await establishConnection();

    if (await checkIfCPFExists(connection, cpf)) {
      await closeConnection(connection);
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    if (await checkIfEmailExists(connection, email)) {
      await closeConnection(connection);
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    await saveUserToDatabase(
      connection,
      0,
      cpf,
      fullName,
      email,
      hashedPassword
    );

    await closeConnection(connection);

    res.status(200).json({ message: "Registro bem-sucedido!" });
  } catch (error) {
    console.error("Erro ao salvar usuário no banco de dados", error);
    res.status(500).json({ error: "Erro ao salvar usuário no banco de dados" });
  }
}
