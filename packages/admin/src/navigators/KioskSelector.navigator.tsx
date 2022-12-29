import { Route, Routes, useNavigate } from 'react-router-dom';
import { UIPaths } from '../config/paths.config';
import { NewKioskPage } from '../pages/NewKiosk.page';
import { KioskSelectPage } from '../pages/KioskSelect.page';
import { useAuthContext } from '../context/auth.context';

export function KioskSelectorNavigator() {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  if (!isAuthenticated || !user) navigate(UIPaths.LOGIN);
  return (
    <Routes>
      <Route path={UIPaths.NEW_KIOSK} element={<NewKioskPage />} />
      <Route path={UIPaths.ROOT} element={<KioskSelectPage />} />
    </Routes>
  );
}
