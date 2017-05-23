import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, Store } from "redux";

import { App } from "components";
import rootReducer from "reducers";

const store: Store<{}> = createStore(rootReducer);

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById("app-root"));
