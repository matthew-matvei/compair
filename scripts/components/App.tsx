import * as React from "react";

import { IAppProps } from "models/props";
import { Header, Main } from ".";

/**
 * The root component for the application.
 */
class App extends React.Component<IAppProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        return <div>
            <Header />
            <Main />
        </div>;
    };
}

export default App;
