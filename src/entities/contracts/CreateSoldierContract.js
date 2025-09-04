import {CreateJobMasterContract} from "./CreateJobMasterContract";

export class CreateSoldierContract extends CreateJobMasterContract {
    constructor(personalNumber, firstName, lastName, unit, rank, jobMasterPersonalNumber) {
        // Call the constructor of the parent class
        super(personalNumber, firstName, lastName, unit, rank);

        // Add the new property specific to this class
        this.jobMasterPersonalNumber = jobMasterPersonalNumber;
    }
}