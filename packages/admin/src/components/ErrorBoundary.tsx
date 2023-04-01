import React, { PropsWithChildren } from 'react';

import { MainLayout } from '../layout/MainLayout';
import { ErrorPage } from '../pages/Error.page';

export class ErrorBoundary extends React.Component<PropsWithChildren> {
  state = {
    error: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: error.message });
  }

  onAction = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <MainLayout>
          <ErrorPage onAction={this.onAction} message={this.state.error} />
        </MainLayout>
      );
    }
    return this.props.children;
  }
}
