import * as React from "react";
import TextField from "material-ui/TextField";

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
        };
    }

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        const { keyName } = this.props;
        const { value } = this.state;

        return <TextField
            type="number"
            id={keyName}
            floatingLabelText={keyName}
            value={value}
            onChange={this.handleValueChange.bind(this)} />;
    }

    /**
     * Handles changing the value in this KeyValue's number input.
     *
     * @param event - the change event from which the value is gotten
     */
    private handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({ value: parseInt(typedTarget.value) });
    }
}

export default KeyValue;
