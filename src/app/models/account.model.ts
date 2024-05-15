export class AccountModel {
    id: number;
    balance: number;
    creationDate: Date;

    constructor(id: number, balance: number, creationDate: Date) {
        this.id = id;
        this.balance = balance;
        this.creationDate = creationDate;
    }
}
