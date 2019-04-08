export interface IEmployeeComment {
    id?: number;
    commentType?: string;
    description?: any;
    employeeId?: number;
}

export class EmployeeComment implements IEmployeeComment {
    constructor(public id?: number, public commentType?: string, public description?: any, public employeeId?: number) {}
}
