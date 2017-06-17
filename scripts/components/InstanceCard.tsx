import * as classNames from "classnames";
import * as React from "react";
import { Icon } from "react-fa";

import { isMissingKeyValue } from "helpers";
import { IInstanceCardProps } from "models/props";
import { AddInstanceDialog, EditInstanceDialog } from ".";

/**
 * A card representing an instance of a subject.
 *
 * @export
 * @class InstanceCard
 * @extends {React.Component<IInstanceCardProps, {}>}
 */
export default class InstanceCard extends
    React.Component<IInstanceCardProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns {JSX.Element} - The JSX required to create this component
     *
     * @memberof InstanceCard
     */
    public render(): JSX.Element {
        const { currentSubject, instance } = this.props;

        const classes = currentSubject && instance ?
            classNames({
                "card-inverse card-danger": isMissingKeyValue(
                    currentSubject.criteria, instance.values)
            }) : "";

        const cardContent = instance && currentSubject ?
            <div className={`card mb-4 ${classes}`}>
                <div className="card-block clickable"
                    onClick={this.handleClick.bind(this)}>
                    <h3 className="card-title">{instance.name}</h3>
                </div>
                <div className="card-footer text-right">
                    <EditInstanceDialog />
                    <button className="btn btn-sm btn-danger"
                        onClick={this.handleClickDelete.bind(this)}>
                        <Icon name="close" />
                    </button>
                </div>
            </div > :
            <div className="card mb-4 bg-faded clickable">
                <div className="card-block"
                    onClick={this.handleClickOpenDialog.bind(this)}>
                    <p className="text-muted">Click for new instance</p>
                </div>
                <AddInstanceDialog />
            </div>;

        return <div className="col-4">
            {cardContent}
        </div>;
    }

    private handleClickOpenDialog() {
        this.props.openDialog!();
    }

    /**
     * Handles editing the instance on user clicking a card with one by passing
     * it to a callback funciton.
     *
     * @private
     *
     * @memberof InstanceCard
     */
    private handleClick() {
        this.props.editInstance!(this.props.instance!);
    }

    /**
     * Handles deleting the instance on user clicking the delete button by
     * passing it to a callback funciton.
     *
     * @private
     *
     * @memberof InstanceCard
     */
    private handleClickDelete() {
        this.props.deleteInstance!(this.props.instance!);
    }
}