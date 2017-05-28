import * as React from "react";

import { IInstanceCardProps } from "models/props";
import { IInstanceCardState } from "models/states";
import { Dialog } from ".";

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
                <Dialog isShowingModal={this.state.isShowingModal}
                    closeModal={this.handleCloseModal.bind(this)} />
                <div className="card-block"
                    onClick={this.handleClick.bind(this)}>
                    <p className="text-muted">Click for new instance</p>
                </div>
            </div>;

        return <div className="col-4">
            {cardContent}
        </div>;
    }

    private handleClick() {
        this.setState({ isShowingModal: true } as IInstanceCardState);
    }

    private handleCloseModal() {
        this.setState({ isShowingModal: false } as IInstanceCardState)
    }
}
