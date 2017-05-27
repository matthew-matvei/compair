import * as React from "react";
import { connect } from "react-redux";

import IState from "models/IState";
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

const mapstateToProps = (state: IState) => ({

});

export default connect(mapstateToProps)(App);
