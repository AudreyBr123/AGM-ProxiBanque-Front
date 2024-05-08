import { AddressModel } from "./address.model";

export class PersonModel {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    address: AddressModel;
    phoneNumber: String;

    constructor(id: number, firstName: String, lastName: String, email: String, address: AddressModel, phoneNumber: String) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
