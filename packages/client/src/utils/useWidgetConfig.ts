import { WidgetConfigBase, WidgetName } from '../types/widget.type';
import { useConfig } from '../layout/ConfigContext';
import { useMemo } from 'react';

export function useWidgetConfig<T extends WidgetConfigBase>(name: WidgetName) {
  const {
    config: { widgets },
  } = useConfig();
  return useMemo(() => {
    return widgets.find((w) => w.name === name) as T;
  }, [widgets]);
}
