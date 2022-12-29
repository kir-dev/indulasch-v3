import { useKioskContext } from '../context/kiosk.context';
import { useAuthContext } from '../context/auth.context';
import { useMemo } from 'react';
import { MenuItems } from '../config/roles.config';

export function useMenuItems() {
  const { selectedKioskId } = useKioskContext();
  const { user } = useAuthContext();
  return useMemo(() => {
    const role = user?.roles.find((r) => r.kioskId._id === selectedKioskId);
    if (!role) return;
    return MenuItems.filter((mi) => {
      if (!mi.minRole) return true;
      // TODO uncomment to enable admin superiority
      // if(user?.isAdmin) return true
      if (mi.admin) {
        return user?.isAdmin;
      }
      return mi.minRole <= role.role;
    });
  }, [selectedKioskId, user?.roles]);
}
