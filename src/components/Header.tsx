import * as React from "react";

import { IHeaderProps } from "models/props";

export default class Header extends React.Component<IHeaderProps, {}> {

    public render(): JSX.Element {
        return <nav className="navbar navbar-inverse bg-inverse mb-4">
            <a className="navbar-brand" href="#">Compair</a>
        </nav>;
    }
}
