export class CreateJobMasterContract {
    constructor(personalNumber = 0, firstName = '', lastName = '', unit = '', rank = '') {
        this.personalNumber = personalNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.unit = unit;
        this.rank = rank;
    }
}
