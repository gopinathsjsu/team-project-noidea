import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";

import App from "./App";
import store from "./redux/store";
import awsExports from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./components/errors/ErrorBoundary";

Amplify.configure(awsExports);

const IndexWrapper = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

const IndexWrapperWithAuth = withAuthenticator(IndexWrapper);

ReactDOM.render(<IndexWrapperWithAuth />, document.getElementById("root"));
