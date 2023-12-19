export default async function checkIfEmailExists(connection, email) {
  const [emailResult] = await connection.execute(
    "SELECT * FROM app WHERE mail = ?",
    [email]
  );

  return emailResult.length > 0;
}
