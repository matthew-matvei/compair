import * as React from "react";

import { IAppProps } from "models/props";
import { Header, Main } from ".";

class App extends React.Component<IAppProps, void> {
    public render(): JSX.Element {
        return <div>
            <Header />
            <Main />
        </div>;
    };
}

export default App;
