import { Route, Routes } from 'react-router-dom';

import { UIPaths } from '../config/paths.config';
import { KioskProvider } from '../context/kiosk.context';
import { SsoLoginPage } from '../pages/SsoLogin.page';

export function RootNavigator() {
  return (
    <Routes>
      <Route path={UIPaths.LOGIN} element={<SsoLoginPage />} />
      <Route path='*' element={<KioskProvider />} />
    </Routes>
  );
}
