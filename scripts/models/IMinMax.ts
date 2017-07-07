/**
 * The minimum and maximum values for a keyValue identified by key.
 */
interface IMinMax {

    /**
     * The key of the keyValue this IMinMax refers to.
     */
    key: string;

    /**
     * The minimum value.
     */
    min: number;

    /**
     * The maximum value.
     */
    max: number;
}

export default IMinMax;
