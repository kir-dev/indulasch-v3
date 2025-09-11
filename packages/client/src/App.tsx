import { Footer } from './components/Footer';
import { Titlebar } from './components/Titlebar';
import { useConfig } from './layout/ConfigContext';
import { Main } from './layout/Main';
import { WidgetDistributor } from './layout/WidgetDistributor';
import { WidgetGrid } from './layout/WidgetGrid';
import { useColorsOfScheme } from './utils/useColorsOfScheme';

function App() {
  const { background } = useColorsOfScheme();
  const { widgets } = useConfig();
  return (
    <Main backgroundColor={background}>
      <Titlebar />
      <WidgetGrid>
        {widgets.map((w) => (
          <WidgetDistributor
            key={`${w.name}-${w.grid.row.start}-${w.grid.row.end}-${w.grid.column.start}-${w.grid.column.end}`}
            config={w}
          />
        ))}
      </WidgetGrid>
      <Footer />
    </Main>
  );
}

export default App;
