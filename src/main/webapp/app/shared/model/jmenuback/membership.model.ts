export interface IMembership {
    id?: number;
    membershipName?: string;
    membershipType?: string;
    subscriptionRate?: string;
    subscriptionAmount?: number;
    description?: any;
    businessId?: number;
}

export class Membership implements IMembership {
    constructor(
        public id?: number,
        public membershipName?: string,
        public membershipType?: string,
        public subscriptionRate?: string,
        public subscriptionAmount?: number,
        public description?: any,
        public businessId?: number
    ) {}
}
