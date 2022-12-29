import React, { PropsWithChildren } from 'react';
import { ErrorPage } from './StatusPage';

export class ErrorBoundary extends React.Component<PropsWithChildren> {
  state = {
    error: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  componentDidCatch(error: Error) {
    console.log(error);
    this.setState({ error: error.message });
  }

  onAction = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return <ErrorPage onAction={this.onAction} message='Nem várt hiba történt, újraindítás szükséges!' />;
    }
    return this.props.children;
  }
}
