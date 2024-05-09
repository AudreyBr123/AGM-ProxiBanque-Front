import { AddressModel } from "./address.model";
import { CurrentAccountModel } from "./current-account.model";
import { PersonModel } from "./person.model";
import { SavingAccountModel } from "./saving-account.model";

export class ClientModel extends PersonModel {
    currentAccount?: CurrentAccountModel;
    savingAccount?: SavingAccountModel;

    constructor(id: number, firstName: String, lastName: String, email: String, address: AddressModel, phoneNumber: String, currentAccount?: CurrentAccountModel, savingAccount?: SavingAccountModel){
        super(id, firstName, lastName, email, address, phoneNumber);
        this.currentAccount = currentAccount
        this.savingAccount = savingAccount
    }
}
