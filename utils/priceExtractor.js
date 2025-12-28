export function extractPrice(query) {
  const match = query.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}
