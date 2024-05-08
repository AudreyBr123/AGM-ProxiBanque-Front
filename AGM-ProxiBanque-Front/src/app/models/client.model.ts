import { AddressModel } from "./address.model";
import { PersonModel } from "./person.model";

export class ClientModel extends PersonModel {
    currentAccount?: Object;
    savingAccount?: Object;
}
