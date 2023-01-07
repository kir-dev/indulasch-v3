export const l = (key: keyof typeof languageData) => {
  return languageData[key];
};

const languageData = {
  'title.loading': 'Betöltés',
  'title.error': 'Hiba',
  'title.unknown': 'Ismeretlen',
  'title.messages': 'Üzenetek',
  'title.meta': 'Alapbeállítások',
  'title.newKiosk': 'Új kioszk',
  'title.login': 'Bejelentkezés',
  'title.style': 'Megjelenés',
  'title.users': 'Kioszk kezelői',
  'title.widgetEdit': 'Csempék beállításai',
  'title.widgets': 'Csempék',
  'title.dashboard': 'Dashboard',
  'error.wrongCredentials': 'Hibás bejelentkezési adatok',
  'error.unauthorized': 'Nem vagy bejelentkezve',
  'error.forbidden': 'Nincs jogosultságod',
  'error.general': 'Ismeretlen hiba történt',
  'error.notFound': 'Nem található',
  'error.create': 'Létrehozás sikertelen',
  'error.save': 'Mentés sikertelen',
  'success.save': 'Sikeres mentés',
  'button.add': 'Hozzáadás',
  'button.delete': 'Törlés',
  'button.save': 'Mentés',
  'button.create': 'Létrehozás',
  'button.cancel': 'Mégse',
  'button.reset': 'Módosítások elvetése',
  'button.continue': 'Tovább',
  'header.confirmDelete': 'Biztosan törlöd?',
  'form.validation.required': 'Nem lenne szép üresen hagyni!',
  'form.validation.date': 'Dátumot kellene írni.',
  'form.validation.number': 'Valami ilyesminek kellene lennie: x.y',
  'form.validation.email': 'Ellenőrizd az e-mail címet!',
  'addUserModal.header': 'Kezelő hozzáadása',
  'addUserModal.label.email': 'Felhasználó e-mail címe',
  'addUserModal.label.role': 'Jogosultság',
  'addUserModal.error.notFound': 'Nincs ilyen felhasználó.',
  'theme.light': 'Világos',
  'theme.dark': 'Sötét',
  'roles.visitor': 'Látogató',
  'roles.marketing': 'Marketing',
  'roles.editor': 'Szerkesztő',
  'roles.owner': 'Tulajdonos',
  'editMessage.header.edit': 'Üzenet szerkesztése',
  'editMessage.header.new': 'Új üzenet',
  'editMessage.label.text': 'Üzenet',
  'editMessage.label.type': 'Típus',
  'editMessage.label.from': 'Megjelenítve ettől',
  'editMessage.label.until': 'Megjelenítve eddig',
  'editMessage.type.info': 'Infó',
  'editMessage.type.success': 'Siker',
  'editMessage.type.warning': 'Figyelmeztetés',
  'editMessage.type.fun': 'Móka',
  'statusBadge.unknown': 'Ismeretlen',
  'statusBadge.problem': 'Probléma',
  'statusBadge.healthy': 'Egészséges',
  'navbar.section.user': 'Felhasználó',
  'navbar.section.kiosk': 'Kioszk beállítások',
  'navbar.kioskSelector': 'Kioszk választó',
  'navbar.unknown': 'Ismeretlen',
  'navbar.logout': 'Kijelentkezés',
  'page.error.heading': 'Erre a hibára fel is készültünk, meg nem is.',
  'page.error.text': 'Ha ezt elküldöd nekünk, nem történik meg később.',
  'page.dashboard.alert':
    'Úgy tűnik a kliens kapcsolata megszakadt a szerverrel. Elképzelhető, hogy a módosítások nem fognak látszódni.',
  'page.dashboard.openClient': 'Kliens megnyitása',
  'page.dashboard.copyClientUrl': 'Kliens címének másolása',
  'page.dashboard.clientId': 'Kioszk azonosítója',
  'page.dashboard.clientStatus': 'Kliens állapota',
  'page.dashboard.lastUpdate': 'A kliens utoljára ekkor frissítette a konfigurációját:',
  'page.dashboard.role': 'Rangod ennél a kioszknál',
  'page.dashboard.coordinates': 'Koordináták',
  'page.dashboard.latitude': 'Szélességi fok',
  'page.dashboard.longitude': 'Hosszúsági fok',
  'page.dashboard.enabledWidgets': 'Engedélyezett csempék',
  'page.dashboard.reloadClient': 'Kliens újraindítása',
  'page.dashboard.reloadButton': 'Újraindítása',
  'page.dashboard.reloadRequested': 'Frissítés kérelmezve',
  'page.dashboard.reloadConfirmHeader': 'Kliens újraindítása',
  'page.dashboard.reloadConfirmText':
    'Újraindítás során a böngészőablak frissül és a legfrissebb kliens szoftver lesz használva. Kérlek\n' +
    'nyisd meg előtte a klienst lokálisan és győződj meg a beállítások helyességéről! Folytatod?',
  'page.dashboard.reloadConfirmButton': 'Újraindít!',
  'page.kioskSelect.welcome': 'Üdvözöllek',
  'page.kioskSelect.yourKiosk': 'A te kioszkjaid',
  'page.kioskSelect.newKiosk': 'Új kioszk',
  'page.messages.newMessage': 'Új üzenet',
  'page.meta.label.name': 'Kioszk neve',
  'page.meta.label.latitude': 'Szélességi fok',
  'page.meta.label.longitude': 'Hosszúsági fok',
  'page.newKiosk.name': 'Kioszk neve',
  'page.login.text':
    'Jelentkezz be AuthSch fiókoddal! A profilod automatikusan létrejön az első bejelentkezés alkalmával.',
  'page.login.button': 'Bejelentkezés AuthSch-val',
  'page.style.label.theme': 'Téma',
  'page.style.label.brand': 'Témaszín',
  'page.style.label.background': 'Háttérszín',
  'page.style.label.tile': 'Csempék színe',
  'page.style.label.fontPrimary': 'Fő betűszín',
  'page.style.label.fontSecondary': 'Másodlagos betűszín',
  'page.users.roleModified': 'Jogosultság módosítva',
  'page.users.roleModificationError': 'Módosítás sikertelen',
  'page.users.newUser': 'Új kezelő',
};
