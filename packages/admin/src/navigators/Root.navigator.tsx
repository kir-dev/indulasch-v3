import { Route, Routes } from 'react-router-dom';
import { UIPaths } from '../config/paths.config';
import { LoginPage } from '../pages/Login.page';
import { RegistrationPage } from '../pages/Registration.page';
import { KioskProvider } from '../context/kiosk.context';

export function RootNavigator() {
  return (
    <Routes>
      <Route path={UIPaths.LOGIN} element={<LoginPage />} />
      <Route path={UIPaths.REGISTER} element={<RegistrationPage />} />
      <Route path='*' element={<KioskProvider />} />
    </Routes>
  );
}
