import { LoadingSpinner } from './LoadingSpinner';
import { Page } from '../layout/Page';

export function LoadingPlaceholder() {
  return (
    <Page title='Betöltés' w='fit-content'>
      <LoadingSpinner />
    </Page>
  );
}
