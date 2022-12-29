import React from 'react';
import { Main } from './layout/Main';
import { useColorsOfScheme } from './utils/useColorsOfScheme';
import { Titlebar } from './components/Titlebar';
import { Footer } from './components/Footer';
import { WidgetGrid } from './layout/WidgetGrid';
import { useConfig } from './layout/ConfigContext';
import { WidgetDistributor } from './layout/WidgetDistributor';

function App() {
  const { background } = useColorsOfScheme();
  const {
    config: { widgets },
  } = useConfig();
  return (
    <Main backgroundColor={background}>
      <Titlebar />
      <WidgetGrid>
        {widgets.map((w) => (
          <WidgetDistributor key={w.name} config={w} />
        ))}
      </WidgetGrid>
      <Footer />
    </Main>
  );
}

export default App;
