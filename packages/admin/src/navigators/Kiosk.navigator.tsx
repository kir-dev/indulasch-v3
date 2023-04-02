import { Route, Routes } from 'react-router-dom';

import { KioskLayout } from '../layout/KioskLayout';
import { useMenuItems } from '../utils/useMenuItems';

export function KioskNavigator() {
  const menuItems = useMenuItems();
  return (
    <KioskLayout>
      <Routes>
        {menuItems?.map((mi) => (
          <Route key={mi.path} element={<mi.page />} path={mi.path} />
        ))}
      </Routes>
    </KioskLayout>
  );
}
