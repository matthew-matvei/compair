import * as React from "react";
import * as ReactModal from "react-modal";

import { IDialogProps } from "models/props";

export default class Dialog extends React.Component<IDialogProps, {}> {

    public render(): JSX.Element {
        return <ReactModal isOpen={this.props.isShowingModal}
            contentLabel="Modal"
            onRequestClose={this.handleRequestClose.bind(this)}>
            <div className="card">
                <div className="card-header text-right">
                    <button className="btn btn-secondary"
                        onClick={this.handleRequestClose.bind(this)}>
                        x
                    </button>
                </div>
                <div className="card-block">
                    <h3>Card header</h3>
                    <p>Card content</p>
                </div>
            </div>
        </ReactModal>;
    }

    private handleRequestClose() {
        this.props.closeModal();
    }
}
