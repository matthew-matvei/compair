import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import * as React from "react";
import { connect } from "react-redux";

import { openModal } from "actions/modals";
import { createSubject, setSelectedSubjectName } from "actions/subjects";
import { enterKey } from "const";
import { IState } from "models";
import { ISubjectsPanelProps } from "models/props";

/**
 * The panel containing all the current subjects in the application.
 */
class SubjectsPanel extends React.Component<ISubjectsPanelProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @returns - The JSX required to create this component
     */
    public render(): JSX.Element {
        /*const selectedSubject = getSelectedSubject(
            this.props.selectedSubjectName, this.props.subjects
        );*/
        const subjectElements = this.props.subjects.map(subject => {
            /*const selected = classNames({
                "active": selectedSubject && subject.name === selectedSubject.name
            });*/

            return <div key={subject.name}>
                <Divider />
                <ListItem
                    id={subject.name}
                    primaryText={subject.name}
                    onClick={this.handleClickSetSelectedSubject.bind(this)}
                    rightIconButton={
                        <IconButton
                            id={subject.name}
                            iconClassName="fa fa-plus"
                            onClick={this.handleClickOpenDialog.bind(this)} />
                    }
                />
            </div>;
        });

        return <div className="col-sm-4 col-md-3 main-section sidebar">
            <List>
                <Subheader>Subjects</Subheader>
                {subjectElements}
                <ListItem>
                    <TextField
                        floatingLabelText="Subject name..."
                        onKeyDown={this.handleKeyDown.bind(this)} />
                </ListItem>
            </List>
        </div>;
    }

    /**
     * Handles adding a subject on user pressing the Enter key.
     *
     * @param event - The key event
     */
    private handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.which === enterKey) {
            const typedTarget = event.currentTarget as HTMLInputElement;
            const newSubjectName = typedTarget.value.trim();
            this.props.dispatch(createSubject(newSubjectName));
            typedTarget.value = "";
        }
    }

    /**
     * Handles opening the dialog to add a criterion and sets the selected
     * subject.
     *
     * @param event - the event from which to take the target's id
     */
    private handleClickOpenDialog(event: React.MouseEvent<HTMLInputElement>) {
        this.handleClickSetSelectedSubject(event);
        this.props.dispatch(openModal("addCriterionDialog"));
    }

    /**
     * Handles setting the selected subject on user clicking its button.
     *
     * @param event - the event from which to identify the selected subject
     */
    private handleClickSetSelectedSubject(event: React.MouseEvent<HTMLButtonElement>) {
        const typedTarget = event.currentTarget as HTMLButtonElement;
        this.props.dispatch(setSelectedSubjectName(typedTarget.id));
    }
}

/**
 * @function mapStateToProps - Maps the relevant properties of the application's
 *      state to this component's props.
 *
 * @param state - The central state of the application
 * @returns - This component's props, taken from the application state
 */
const mapStateToProps = (state: IState) => ({
    subjects: state.subjects,
    selectedSubjectName: state.selectedSubjectName
});

export default connect(mapStateToProps)(SubjectsPanel);
