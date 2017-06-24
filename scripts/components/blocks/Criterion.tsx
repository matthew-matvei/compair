import Tooltip from "rc-tooltip";
import * as React from "react";

import { ICriterionProps } from "models/props";
import { ICriterionState } from "models/states/blocks";
import { Priority } from "types";

class Criterion extends React.Component<ICriterionProps, ICriterionState> {

    constructor(props: ICriterionProps) {
        super(props);

        this.state = {
            keyInputValue: props.keyInputValue || "",
            orderInputChecked: props.orderInputChecked || false,
            priorityInputValue: props.priorityInputValue
        };
    }

    public render(): JSX.Element {
        const orderTooltip = this.state.orderInputChecked ?
            "Smaller wins, like golf!" : "The more the merrier!";

        return <form className="form-inline">
            <div className="input-group col-6">
                <span className="input-group-addon">
                    Criterion Key
                            </span>
                <input type="text"
                    className="form-control"
                    placeholder="Criterion name..."
                    value={this.state.keyInputValue}
                    onChange={this.handleKeyChange.bind(this)} />
            </div>
            <div className="input-group col-2">
                <Tooltip overlay={<span>{orderTooltip}</span>}>
                    <label className="form-check-label">
                        <input type="checkbox"
                            className="form-check-input"
                            checked={this.state.orderInputChecked}
                            onClick={this.handleClickOrder.bind(this)} />
                        Ascending
                            </label>
                </Tooltip>
            </div>
            <div className="input-group col-4">
                <span className="input-group-addon">
                    Priority
                </span>
                <Tooltip overlay={
                    <span>
                        1 = unimportant; 5 = very important
                    </span>}>
                    <input type="number"
                        className="form-control"
                        value={this.state.priorityInputValue}
                        onChange={this.handlePriorityChange.bind(this)}
                        min="1" max="5" />
                </Tooltip>
            </div>
        </form>;
    }

    private handleClickOrder(event: React.MouseEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({ orderInputChecked: typedTarget.checked });
    }

    private handleKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({ keyInputValue: typedTarget.value });
    }

    private handlePriorityChange(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({
            priorityInputValue: parseInt(typedTarget.value) as Priority
        });
    }
}

export default Criterion;