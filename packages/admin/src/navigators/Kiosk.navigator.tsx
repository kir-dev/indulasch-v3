import { useMenuItems } from '../utils/useMenuItems';
import { Route, Routes } from 'react-router-dom';
import { KioskLayout } from '../layout/KioskLayout';

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
