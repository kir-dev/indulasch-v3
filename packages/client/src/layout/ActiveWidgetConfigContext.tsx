import React, { createContext, PropsWithChildren, useContext } from 'react';

import { WidgetConfig, WidgetConfigBase } from '@/types/widget.type';

const ActiveWidgetConfigContext = createContext<WidgetConfig | undefined>(undefined);

export const ActiveWidgetProvider: React.FC<PropsWithChildren<{ config: WidgetConfig }>> = ({ config, children }) => {
  return <ActiveWidgetConfigContext.Provider value={config}>{children}</ActiveWidgetConfigContext.Provider>;
};

export function useActiveWidgetConfig<T extends WidgetConfigBase>(): T | undefined {
  return useContext(ActiveWidgetConfigContext) as T | undefined;
}
