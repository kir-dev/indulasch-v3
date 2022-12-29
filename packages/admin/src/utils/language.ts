export const l = (key: keyof typeof languageData) => {
  return languageData[key];
};

const languageData = {
  'error.wrongCredentials': 'Hibás bejelentkezési adatok',
  'error.unauthorized': 'Nem vagy bejelentkezve',
  'error.forbidden': 'Nincs jogosultságod',
  'error.general': 'Ismeretlen hiba történt',
  'error.auth': 'Bejelentkezési hiba történt',
  'error.register': 'Regisztrációs hiba történt',
  'error.internal': 'Szerver oldali hiba történt',
  'error.notFound': 'Nem található',
  'error.createKiosk': 'Kioszk létrehozása sikertelen',
  'error.saveSettings': 'Beállítások mentése sikertelen',
};
