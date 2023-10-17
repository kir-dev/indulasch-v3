import { Navigate, Route, Routes } from 'react-router-dom';

import { UIPaths } from '../config/paths.config';
import { useAuthContext } from '../context/auth.context';
import { KioskSelectPage } from '../pages/KioskSelect.page';
import { NewKioskPage } from '../pages/NewKiosk.page';

export function KioskSelectorNavigator() {
  const { user, isAuthenticated } = useAuthContext();
  if (!isAuthenticated || !user) {
    return <Navigate to={UIPaths.LOGIN} replace={true} />
  }
  return (
    <Routes>
      <Route path={UIPaths.NEW_KIOSK} element={<NewKioskPage />} />
      <Route path={UIPaths.ROOT} element={<KioskSelectPage />} />
    </Routes>
  );
}
