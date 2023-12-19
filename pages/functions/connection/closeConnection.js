export default async function closeConnection(connection) {
  await connection.end();
}
