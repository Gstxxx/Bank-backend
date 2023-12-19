import bcrypt from "bcrypt";
import { closeConnection } from "../../functions/connection/closeConnection";
import { establishConnection } from "../../functions/connection/openConnection";

async function getUserByEmail(connection, email) {
  const [userResult] = await connection.execute(
    "SELECT * FROM app WHERE mail = ?",
    [email]
  );

  return userResult;
}

async function authenticateUser(password, storedPassword) {
  return await bcrypt.compare(password, storedPassword);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res
      .status(405)
      .setHeader("Allow", ["POST"])
      .json({ error: "Método não permitido" });
    return;
  }

  const { email, password } = req.body;

  try {
    const connection = await establishConnection();

    const userResult = await getUserByEmail(connection, email);

    if (userResult.length === 0) {
      await closeConnection(connection);
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const user = userResult[0];
    const passwordMatch = await authenticateUser(password, user.pass);

    if (!passwordMatch) {
      await closeConnection(connection);
      return res.status(401).json({ error: "Senha incorreta" });
    }

    await closeConnection(connection);
    res.status(200).json({ message: "Autenticação bem-sucedida!" });
  } catch (error) {
    console.error("Erro ao autenticar usuário", error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
}
