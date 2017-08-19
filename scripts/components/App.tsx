import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";

import { IAppProps } from "models/props";
import { AddCriteriaDialog, AddInstanceDialog, EditInstanceDialog, Main } from ".";

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
                <AppBar title="Compair" showMenuIconButton={false} zDepth={2} />
                <Main />
                <AddCriteriaDialog />
                <AddInstanceDialog />
                <EditInstanceDialog />
            </div>
        </MuiThemeProvider>;
    };
}

export default App;
