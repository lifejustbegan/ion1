export interface IEmployeSalary {
    id?: number;
    hourly?: number;
    weekly?: number;
    biWeekly?: number;
    monthly?: number;
}

export class EmployeSalary implements IEmployeSalary {
    constructor(public id?: number, public hourly?: number, public weekly?: number, public biWeekly?: number, public monthly?: number) {}
}
