import Slider from "rc-slider";
import * as React from "react";
import Toggle from "react-toggle";

import { SimpleTooltip } from "components";
import { ICriterion } from "models";
import { ICriterionProps } from "models/props";
import { ICriterionState } from "models/states";
import { Priority } from "types";

class Criterion extends React.Component<ICriterionProps, ICriterionState> {

    /**
     * Creates an instance of Criterion.
     *
     * @param props - The props for this component
     */
    constructor(props: ICriterionProps) {
        super(props);

        this.state = {
            keyInputValue: props.keyInputValue || "",
            orderInputChecked: props.orderInputChecked || false,
            priorityInputValue: props.priorityInputValue
        };
    }

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        const orderTooltip = this.state.orderInputChecked ?
            "Ascending = Smaller wins, like golf!" :
            "Descending = The more the merrier!";

        return <form className="form-inline mb-3">
            <div className="input-group col-6">
                <span className="input-group-addon">
                    Criterion Key
                </span>
                <input type="text"
                    className="form-control"
                    placeholder="Criterion name..."
                    value={this.state.keyInputValue}
                    onChange={this.props.newCriterion ?
                        this.handleChangeKey.bind(this) : undefined} />
            </div>
            <div className="input-group col-2">
                <SimpleTooltip message={orderTooltip}>
                    <label className="form-check-label">
                        <Toggle checked={this.state.orderInputChecked}
                            onChange={this.handleChangeOrder.bind(this)} />
                        <span>Ascending</span>
                    </label>
                </SimpleTooltip>
            </div>
            <div className="col-4" style={{ display: "flex", flexDirection: "column" }}>
                <div className="input-group">
                    <span className="input-group-addon">
                        Priority
                        </span>
                    <SimpleTooltip message={"1 = unimportant; 5 = very important"}>
                        <input type="number"
                            className="form-control"
                            value={this.state.priorityInputValue}
                            onChange={this.handlePriorityChange.bind(this)}
                            min="1" max="5" />
                    </SimpleTooltip>
                </div>
                <Slider dots step={1}
                    defaultValue={3}
                    value={this.state.priorityInputValue}
                    onChange={this.handlePrioritySliderChange.bind(this)}
                    min={1} max={5} />
            </div>
        </form>;
    }

    /**
     * Handles setting the keyInputValue on change.
     *
     * @param event - The change event from whose target the value is gotten
     */
    private handleChangeKey(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({ keyInputValue: typedTarget.value });
    }

    /**
     * Handles setting the orderInputChecked on change.
     *
     * @param event - The change event from whose target the checked status is gotten
     */
    private handleChangeOrder(event: React.MouseEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({ orderInputChecked: typedTarget.checked }, () => {
            this.sendCriterionUp();
        });
    }

    /**
     * Handles setting the priorityInputValue on change.
     *
     * @param event - The change event from whose target the value is gotten
     */
    private handlePriorityChange(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTarget = event.target as HTMLInputElement;
        this.setState({
            priorityInputValue: parseInt(typedTarget.value) as Priority
        }, () => {
            this.sendCriterionUp();
        });
    }

    private handlePrioritySliderChange(value: number) {
        this.setState({ priorityInputValue: value as Priority }, () => {
            this.sendCriterionUp();
        });
    }

    /**
     * Handles sending the criterion up to the parent component as an ICriterion.
     */
    private sendCriterionUp() {
        if (this.props.onChange) {
            const criterion: ICriterion = {
                key: this.state.keyInputValue,
                order: this.state.orderInputChecked ? "asc" : "desc",
                priority: this.state.priorityInputValue || 1
            };

            this.props.onChange(criterion);
        }
    }
}

export default Criterion;
