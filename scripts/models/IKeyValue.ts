/**
 * A key value pair where the key relates to the key of a subject's criterion.
 *
 * @interface IKeyValue
 */
interface IKeyValue {

    /**
     * The key of this key value pair.
     *
     * @type {string}
     * @memberof IKeyValue
     */
    key: string;

    /**
     * The value of this key value pair.
     *
     * @type {number}
     * @memberof IKeyValue
     */
    value: number;
}

export default IKeyValue;
