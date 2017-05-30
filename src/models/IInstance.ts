import { IKeyValue } from "models";

interface IInstance {

    /**
     * The name of this instance.
     *
     * @type {string}
     * @memberof IInstance
     */
    name: string;

    /**
     * A list of key values relating to the criteria of this instance's subject.
     *
     * @type {IKeyValue[]}
     * @memberof IInstance
     */
    values: IKeyValue[];
}

export default IInstance;
