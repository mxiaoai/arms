export class User {
    public id: number = -1;
    public email: string;
    public firstName: string;
    public lastName: string;
    public chnName: string;
    public createdBy: string;
    public createdOn: string;
    public updatedBy: string;
    public updatedOn: string;

    constructor(id: number, email: string, firstName: string, lastName: string,
        chnName: string, createdBy: string, createdOn: string, updatedBy: string,
        updatedOn: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.chnName = chnName;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }
};