export default async function checkIfCPFExists(connection, cpf) {
  const [cpfResult] = await connection.execute(
    "SELECT * FROM app WHERE document = ?",
    [cpf]
  );

  return cpfResult.length > 0;
}
