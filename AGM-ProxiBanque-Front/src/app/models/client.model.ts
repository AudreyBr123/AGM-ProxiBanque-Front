import { AccountModel } from "./account.model";
import { PersonModel } from "./person.model";

export class ClientModel extends PersonModel {
    currentAccount?: AccountModel;
    savingAccount?: AccountModel;
}
