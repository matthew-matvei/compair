import { IKeyValue } from "models";

/**
 * A single instance of a subject.
 */
interface IInstance {

    /**
     * The name of this instance.
     */
    name: string;

    /**
     * The instance's old name, if any.
     */
    oldName?: string;

    /**
     * A list of key values relating to the criteria of this instance's subject.
     */
    values: IKeyValue[];

    /**
     * The instance's overall score, if any.
     */
    score?: number;
}

export default IInstance;
