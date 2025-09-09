import {trimInputString} from "../../utils/StringUtils";

export class JobMasterContract {
    constructor(personalNumber = '', firstName = '', lastName = '', unit = '', rank = '') {
        this.personalNumber = personalNumber;
        this.firstName = trimInputString(firstName);
        this.lastName = trimInputString(lastName);
        this.unit = trimInputString(unit);
        this.rank = trimInputString(rank);
    }
}
