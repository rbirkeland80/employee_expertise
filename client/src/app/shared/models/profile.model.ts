export class Profile {
    public _id: string;
    public active: boolean;
    public name: string;
    public employeePositionName: string;
    public knowledgeBase: any[];

    constructor(_id: string, active: boolean, name: string, employeePositionName: string, knowledgeBase: any) {}
}
