import * as React from "react";

import { IInstanceCardProps } from "models/props";
import { IInstanceCardState } from "models/states";
import { AddInstanceDialog } from ".";

export default class InstanceCard extends
    React.Component<IInstanceCardProps, IInstanceCardState> {

    constructor(props: IInstanceCardProps) {
        super(props);

        this.state = {
            isShowingModal: false
        } as IInstanceCardState;
    }

    public render(): JSX.Element {
        const cardContent = this.props.instance ?
            <div className="card mb-4">
                <div className="card-block">
                    <h3 className="card-title">{this.props.instance.name}</h3>
                </div>
                <div className="card-footer">
                    <div className="btn-group">
                        <button className="btn btn-sm">?</button>
                        <button className="btn btn-sm">x</button>
                    </div>
                </div>
            </div> :
            <div className="card mb-4 bg-faded">
                <AddInstanceDialog />
            </div>;

        return <div className="col-4">
            {cardContent}
        </div>;
    }
}
