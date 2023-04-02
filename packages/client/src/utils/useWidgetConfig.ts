import { useMemo } from 'react';

import { useConfig } from '../layout/ConfigContext';
import { WidgetConfigBase, WidgetName } from '../types/widget.type';

export function useWidgetConfig<T extends WidgetConfigBase>(name: WidgetName) {
  const {
    config: { widgets },
  } = useConfig();
  return useMemo(() => {
    return widgets.find((w) => w.name === name) as T;
  }, [name, widgets]);
}
