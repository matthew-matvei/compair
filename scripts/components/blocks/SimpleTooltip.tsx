import Tooltip from "rc-tooltip";
import * as React from "react";

import { ISimpleTooltipProps } from "models/props";

class SimpleTooltip extends React.PureComponent<ISimpleTooltipProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        return <Tooltip overlay={<span>{this.props.message}</span>}>
            {this.props.children}
        </Tooltip>;
    }
}

export default SimpleTooltip;
