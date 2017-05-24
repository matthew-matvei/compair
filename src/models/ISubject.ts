import { IKeyValue } from "models";

interface ISubject {
    name: string;
    oldName?: string;
    values: IKeyValue[];
}

export default ISubject;
