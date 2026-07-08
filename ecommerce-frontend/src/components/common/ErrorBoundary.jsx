import { Component } from "react";
import Button from "./Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center dark:bg-slate-950">
          <div className="glass-panel max-w-lg rounded-3xl p-8">
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Something broke</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Please refresh the page. If this repeats, check the browser console for details.
            </p>
            <Button className="mt-6" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
