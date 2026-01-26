export interface Patient {
    mrn?: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    sex: string;
    age: number;
}