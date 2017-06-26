/*!
 * Compair - An extensible yet simple to use tool for comparing anything.
 * Copyright (C) 2017  Matthew James
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-toggle/style.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, Store } from "redux";
const app = (window as any).require("electron").remote.app;

import { addSubject, setSelectedSubject } from "actions/subjects";
import { App } from "components";
import { readSubjects, saveSubjects } from "helpers";
import { ISubject } from "models";
import rootReducer from "reducers";

const store: Store<any> = createStore(rootReducer);

const subjects: ISubject[] = readSubjects(app.getPath("userData"));
subjects.forEach(subject => store.dispatch(addSubject(subject)));
if (subjects.length > 0) {
    store.dispatch(setSelectedSubject(subjects[subjects.length - 1]));
}

// Subjects are stored in userData on closing of the main window
window.addEventListener("unload", () => {
    saveSubjects(app.getPath("userData"), store.getState().subjects);
});

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById("app-root"));
