export default function generateRandomString(length = 5) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array(length)
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('');
}
