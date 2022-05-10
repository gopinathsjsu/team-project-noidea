import React from "react";
import { v4 as uuidv4 } from "uuid";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: uuidv4() };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   this.setState({ hasError: true });
  // }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ margin: 30 }}>
          <h1 style={{ fontSize: 100 }}>{">_<"}</h1>
          <h2>Something went catestrophically wrong</h2>
          <h5>Please refresh the page and try again ...</h5>
          <h5 style={{ marginTop: 50 }}>If this keeps failing, reach out to support with the following error ID</h5>
          <h6>Error ID: {this.state.errorId}</h6>
        </div>
      );
    }

    return this.props.children;
  }
}
