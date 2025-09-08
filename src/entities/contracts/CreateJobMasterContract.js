export class CreateJobMasterContract {
    constructor(personalNumber = '', firstName = '', lastName = '', unit = '', rank = '') {
        this.personalNumber = personalNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.unit = unit;
        this.rank = rank;
    }
}
