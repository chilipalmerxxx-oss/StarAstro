import { Component, type ErrorInfo, type ReactNode } from 'react';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export default class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Nightstar render error]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="boot-error" role="alert">
        <div>
          <p>Nightstar</p>
          <h1>Une erreur inattendue est survenue</h1>
          <p>Rechargez l’application pour réessayer.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </div>
      </main>
    );
  }
}
