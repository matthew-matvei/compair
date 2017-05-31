import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";

import { IState } from "models";
import { IAddCriteriaDialogProps } from "models/props";

class AddCriteriaDialog extends React.Component<IAddCriteriaDialogProps, {}> {
    public render(): JSX.Element {

        const selectedSubject = this.props.subjects.filter(subject =>
            subject.name === this.props.selectedSubject.name)[0];
        const criteriaElements = selectedSubject.criteria.map(criterion =>
            <div className="col-12">
                <div className="input-group">
                    <span className="input-group-addon">Criterion Key</span>
                    <input type="text" className="form-control" />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">Order</span>
                    <input type="checkbox" className="form-control" />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">Priority</span>
                    <input type="number" min="1" max="5" />
                </div>
            </div>);

        return <div>
            <button className="nav-link btn btn-secondary">?</button>
            <ReactModal isOpen={this.props.isShowingModal}
                contentLabel="Modal">
                <div className="card">
                    <div className="card-header text-right">
                        <button className="btn btn-secondary">
                            x
                            </button>
                    </div>
                    <div className="card-block">
                        <input className="form-control"
                            placeholder="Create instance" />
                        {criteriaElements}
                    </div>
                    <div className="card-footer text-right">
                        <button className="btn btn-primary">
                            Create
                            </button>
                        <button className="btn btn-secondary">
                            Cancel
                            </button>
                    </div>
                </div>
            </ReactModal>
        </div>;
    }
}

const mapStateToProps = (state: IState) => ({
    selectedSubject: state.selectedSubject,
    subjects: state.subjects,
    isShowingModal: state.isShowingModal
});

export default connect(mapStateToProps)(AddCriteriaDialog);
