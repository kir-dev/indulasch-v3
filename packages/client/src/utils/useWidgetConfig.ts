import { useMemo } from 'react';

import { useActiveWidgetConfig } from '@/layout/ActiveWidgetConfigContext';

import { useConfig } from '../layout/ConfigContext';
import { WidgetConfigBase, WidgetName } from '../types/widget.type';

export function useWidgetConfig<T extends WidgetConfigBase>(name: WidgetName) {
  const active = useActiveWidgetConfig<T>();
  const { widgets } = useConfig();
  return useMemo(() => {
    if (active && active.name === name) return active;
    return widgets.find((w) => w.name === name) as T;
  }, [name, widgets, active]);
}
