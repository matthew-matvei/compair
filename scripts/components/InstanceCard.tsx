import { Card, CardActions, CardHeader } from "material-ui/Card";
import Chip from "material-ui/Chip";
import { GridTile } from "material-ui/GridList";
import RaisedButton from "material-ui/RaisedButton";
import { red50, red600 } from "material-ui/styles/colors";
import * as React from "react";

import { getMaxScore, getMinScore, isMissingKeyValue, showScore } from "helpers";
import { IInstanceCardProps } from "models/props";

/**
 * A card representing an instance of a subject.
 */
export default class InstanceCard extends React.Component<IInstanceCardProps, {}> {

    /**
     * Defines the rendering of this component.
     *
     * @return - The JSX required to create this component
     */
    public render(): JSX.Element {
        const { currentSubject, instance } = this.props;

        const minScore = currentSubject && getMinScore(currentSubject.instances) || 0;
        const maxScore = currentSubject && getMaxScore(currentSubject.instances) || 0;

        const wrapperStyle: React.CSSProperties = {
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end"
        };

        const cardContent = instance && currentSubject ?
            <Card>
                <CardHeader
                    title={instance.name}
                    subtitle={showScore(instance.score, minScore, maxScore)} />
                <CardActions style={wrapperStyle}>
                    {isMissingKeyValue(currentSubject.criteria, instance.values) &&
                        <Chip backgroundColor={red600} labelColor={red50}>
                            Missing value
                        </Chip>}
                    <RaisedButton
                        label="Edit"
                        onClick={this.handleClick.bind(this)} />
                    <RaisedButton
                        label="Delete"
                        secondary
                        onClick={this.handleClickDelete.bind(this)} />
                </CardActions>
            </Card> : <Card className="mb-4">
                <CardHeader subtitle="New instance" />
                <CardActions style={{ textAlign: "right" }}>
                    <RaisedButton
                        label="Create"
                        primary
                        onClick={this.handleClickOpenDialog.bind(this)} />
                </CardActions>
            </Card>;

        return <GridTile>
            {cardContent}
        </GridTile>;
    }

    /**
     * Handles opening an AddInstanceDialog on click.
     */
    private handleClickOpenDialog() {
        this.props.openDialog!();
    }

    /**
     * Handles editing the instance on user clicking a card with one by passing
     * it to a callback funciton.
     */
    private handleClick() {
        this.props.editInstance!(this.props.instance!);
    }

    /**
     * Handles deleting the instance on user clicking the delete button by
     * passing it to a callback funciton.
     */
    private handleClickDelete() {
        this.props.deleteInstance!(this.props.instance!);
    }
}
