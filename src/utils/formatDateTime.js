export default function formatDateTime(date) {
  const createdAt = new Date(date);
  const localCreatedAt = createdAt.toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  return localCreatedAt
}
