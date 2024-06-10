export class AccountModel {
    id: number | null;
    balance: number;
    creationDate: Date;

    constructor(id: number | null, balance: number, creationDate: Date) {
        this.id = id;
        this.balance = balance;
        this.creationDate = creationDate;
    }
}
