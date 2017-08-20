import Slider from "material-ui/Slider";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import * as React from "react";

import { SimpleTooltip } from "components";
import { ICriterion } from "models";
import { ICriterionProps } from "models/props";
import { ICriterionState } from "models/states";
import { Priority } from "types";

/**
 * A panel containing controls to define a criterion.
 */
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
                <TextField
                    floatingLabelText="Criterion key"
                    floatingLabelFixed
                    hintText="Criterion name..."
                    value={this.state.keyInputValue}
                    onChange={this.props.newCriterion ?
                        this.handleChangeKey.bind(this) : undefined} />
            </div>
            <div className="input-group col-3">
                <SimpleTooltip message={orderTooltip}>
                    <Toggle
                        label="Ascending"
                        labelPosition="right"
                        defaultToggled={this.state.orderInputChecked}
                        onChange={this.handleChangeOrder.bind(this)} />
                </SimpleTooltip>
            </div>
            <div className="col-3" style={{ display: "flex", flexDirection: "column" }}>
                <SimpleTooltip message={"1 = unimportant; 5 = very important"}>
                    <TextField
                        floatingLabelText="Priority"
                        hintText="Enter priority"
                        type="number"
                        value={this.state.priorityInputValue}
                        onChange={this.handlePriorityChange.bind(this)}
                        min={1} max={5} />
                </SimpleTooltip>
                <Slider
                    step={1}
                    value={this.state.priorityInputValue}
                    min={1}
                    max={5}
                    onChange={this.handlePrioritySliderChange.bind(this)} />
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
            // if typedTarget.value is an empty string, a fallback of undefined is used
            priorityInputValue: (parseInt(typedTarget.value) || undefined) as Priority
        }, () => {
            this.sendCriterionUp();
        });
    }

    /**
     * Handles setting the priorityInputValue on slider change.
     *
     * @param value - the value to set as the priority input's value
     */
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
