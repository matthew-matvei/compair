import Tooltip from "rc-tooltip";
import * as React from "react";

import { ISimpleTooltipProps } from "models/props";

class SimpleTooltip extends React.PureComponent<ISimpleTooltipProps, {}> {

    public render(): JSX.Element {
        return <Tooltip overlay={<span>{this.props.message}</span>}>
            {this.props.children}
        </Tooltip>;
    }
}

export default SimpleTooltip;
