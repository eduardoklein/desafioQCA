export function generateSKU(): string {
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `SKU-${timestamp}-${random}`;
}
