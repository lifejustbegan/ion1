export interface ILocation {
    id?: number;
    address1?: string;
    address2?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    country?: string;
    employeeId?: number;
    businessId?: number;
}

export class Location implements ILocation {
    constructor(
        public id?: number,
        public address1?: string,
        public address2?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public country?: string,
        public employeeId?: number,
        public businessId?: number
    ) {}
}
