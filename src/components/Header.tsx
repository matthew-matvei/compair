import * as React from "react";

import { IHeaderProps } from "models/props";

/**
 * The header section of the application.
 *
 * @export
 * @class Header
 * @extends {React.Component<IHeaderProps, {}>}
 */
export default class Header extends React.Component<IHeaderProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element} - The JSX required to create this component
     *
     * @memberof Header
     */
    public render(): JSX.Element {
        return <nav className="navbar navbar-inverse bg-inverse mb-4">
            <a className="navbar-brand" href="#">Compair</a>
        </nav>;
    }
}
