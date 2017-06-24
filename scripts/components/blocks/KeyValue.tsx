import * as React from "react";

import { IKeyValueProps } from "models/props";
import { IKeyValueState } from "models/states";

/**
 * A component representing a keyValue pair in an instance dialog.
 */
class KeyValue extends React.Component<IKeyValueProps, IKeyValueState> {

    /**
     * Creates an instance of KeyValue.
     *
     * @param props - The props for this component
     */
    constructor(props: IKeyValueProps) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    public render(): JSX.Element {
        const { keyName } = this.props;

        return <div className="col-6" key={keyName}>
            <div className="input-group">
                <span className="input-group-addon">{keyName}</span>
                <input type="number"
                    id={keyName}
                    value={this.state.value}
                    className="form-control"
                    onChange={this.handleValueChange.bind(this)} />
            </div>
        </div>;
    }

    private handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({ value: parseInt(typedTarget.value) });
    }
}

export default KeyValue;
