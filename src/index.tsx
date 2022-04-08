import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store/store";
import Context from "./context/Context";

ReactDOM.render(
  // <React.StrictMode>

  <Context>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Context>,
  // </React.StrictMode>
  document.getElementById("root")
);
