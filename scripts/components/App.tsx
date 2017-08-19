import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";

import { IAppProps } from "models/props";
import { Header, Main } from ".";

/**
 * The root component for the application.
 */
class App extends React.Component<IAppProps, {}> {

    /**
     * Defines the rendering of this component.
     */
    public render(): JSX.Element {
        return <MuiThemeProvider>
            <div>
                <Header />
                <Main />
            </div>
        </MuiThemeProvider>;
    };
}

export default App;
