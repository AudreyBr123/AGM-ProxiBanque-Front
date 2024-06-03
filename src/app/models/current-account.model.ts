import { AccountModel } from "./account.model";

export class CurrentAccountModel extends AccountModel {
    constructor(id: number | null, balance: number, creationDate: Date) {
        super(id, balance, creationDate);
    }
}
