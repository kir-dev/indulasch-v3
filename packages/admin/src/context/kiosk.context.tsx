import axios, { isAxiosError } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiPaths, UIPaths } from '../config/paths.config';
import { MainLayout } from '../layout/MainLayout';
import { KioskNavigator } from '../navigators/Kiosk.navigator';
import { KioskSelectorNavigator } from '../navigators/KioskSelector.navigator';
import { Kiosk } from '../types/kiosk.types';
import { useAuthContext } from './auth.context';

type KioskContextType = {
  kiosk: Kiosk | undefined;
  selectedKioskId: string | undefined;
  setSelectedKiosk: (id: string) => void;
  unselect: () => void;
  update: () => void;
};

export const KioskContext = createContext<KioskContextType>({
  kiosk: undefined,
  selectedKioskId: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  setSelectedKiosk: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unselect: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
});

export function KioskProvider() {
  const { logout } = useAuthContext();
  const [kiosk, setKiosk] = useState<Kiosk>();
  const [kioskId, setKioskId] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!kioskId) return;
    update();
  }, [kioskId]);

  const unselect = () => {
    setKiosk(undefined);
    setKioskId(undefined);
    navigate(UIPaths.ROOT);
  };

  const update = () => {
    axios
      .get<Kiosk>(`${ApiPaths.KIOSK}/${kioskId}`)
      .then((res) => {
        setKiosk(res.data);
        navigate(UIPaths.DASHBOARD);
      })
      .catch((err) => {
        if (isAxiosError(err) && err.response?.status === 401) {
          logout();
        } else unselect();
      });
  };

  return (
    <KioskContext.Provider
      value={{
        kiosk,
        selectedKioskId: kioskId,
        unselect,
        setSelectedKiosk: setKioskId,
        update,
      }}
    >
      <MainLayout drawerEnabled>{kiosk ? <KioskNavigator /> : <KioskSelectorNavigator />}</MainLayout>
    </KioskContext.Provider>
  );
}

export const useKioskContext = () => useContext(KioskContext);
