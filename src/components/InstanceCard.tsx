import * as classNames from "classnames";
import * as React from "react";

import { isMissingKeyValue } from "helpers";
import { IInstanceCardProps } from "models/props";
import { AddInstanceDialog } from ".";

export default class InstanceCard extends
    React.Component<IInstanceCardProps, {}> {

    public render(): JSX.Element {
        const { currentSubject, instance } = this.props;

        const classes = currentSubject && instance ?
            classNames({
                "card-inverse card-danger": isMissingKeyValue(
                    currentSubject.criteria, instance.values)
            }) : "";

        const cardContent = instance && currentSubject ?
            <div className={`card mb4 ${classes}`}>
                <div className="card-block">
                    <h3 className="card-title">{instance.name}</h3>
                </div>
                <div className="card-footer">
                    <div className="btn-group">
                        <button className="btn btn-sm">?</button>
                        <button className="btn btn-sm">x</button>
                    </div>
                </div>
            </div > :
            <div className="card mb-4 bg-faded">
                <AddInstanceDialog />
            </div>;

        return <div className="col-4">
            {cardContent}
        </div>;
    }
}
