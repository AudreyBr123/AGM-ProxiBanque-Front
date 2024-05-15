import { AccountModel } from "./account.model";

export class SavingAccountModel extends AccountModel{
    constructor(id: number, balance: number, creationDate: Date) {
        super(id, balance, creationDate);
    }
}
