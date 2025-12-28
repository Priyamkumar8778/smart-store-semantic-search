export function extractCategory(query) {
  // Define a list of possible categories (add more as needed)
  const categories = [
    "electronics",
    "clothing",
    "food",
    "book",
    "home",
    "sport",
    "toy",
    "fruit",
    "stationery",
  ];

  // Convert query to lowercase for case-insensitive matching
  const lowerQuery = query.toLowerCase();

  // Find the first matching category in the query
  for (const category of categories) {
    if (lowerQuery.includes(category)) {
      return category;
    }
  }

  // Return null if no category found
  return null;
}
