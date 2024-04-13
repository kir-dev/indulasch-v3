import { Footer } from './components/Footer';
import { Titlebar } from './components/Titlebar';
import { useConfig } from './layout/ConfigContext';
import { Main } from './layout/Main';
import { WidgetDistributor } from './layout/WidgetDistributor';
import { WidgetGrid } from './layout/WidgetGrid';
import { useColorsOfScheme } from './utils/useColorsOfScheme';

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
