export function checkThreshold(date: string) {
  const currentDate = new Date();
  const difference = currentDate.getTime() - new Date(date).getTime();
  const threshold = 1000 * 60;
  return difference > threshold;
}
