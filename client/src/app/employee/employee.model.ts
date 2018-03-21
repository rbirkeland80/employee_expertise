export class Employee {
    public carrierAdvisor: any;
    public competenceManager: any;
    public knowledgeBaseHistory: [any];
    public level: string;
    public location: {
        city: string,
        country: string,
        office: string
    };
    public name: {
        first: string,
        last: string
    };
    public permissions: any;
    public phone: {
        internal: string,
        mobile: string
    };
    public profile: any;
    public username: string;
    readonly _id: string;

    constructor(employee) {
        this.carrierAdvisor = employee.carrierAdvisor;
        this.competenceManager = employee.competenceManager;
        this.knowledgeBaseHistory = employee.knowledgeBaseHistory;
        this.level = employee.level;
        this.location = employee.location;
        this.name = employee.name;
        this.permissions = employee.permissions;
        this.phone = employee.phone;
        this.profile = employee.profile;
        this.username = employee.username;
        this._id = employee._id;
    }
}
