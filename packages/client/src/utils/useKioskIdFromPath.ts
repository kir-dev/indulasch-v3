export function useKioskIdFromPath() {
  const path = window.location.pathname;
  return path.split('/')[1];
}
