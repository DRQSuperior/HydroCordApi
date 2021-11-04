import { React } from "commonModules";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div className="HydroCord-error-handler">
        <h1 className="HydroCord-error-handler-title">Oops, we had a fucky wucky. (HydroCord)</h1>
        <code className="HydroCord-error-handler-code">{`${this.state.error}` /* wtf lol */}</code>
      </div>;
    }

    return this.props.children; 
  }
}