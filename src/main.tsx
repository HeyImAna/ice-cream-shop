//react-router
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//styles
import "./scss/style.scss";
import "./index.css";

//redux
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
