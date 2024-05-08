import { AddressModel } from "./address.model";

export class PersonModel {
    firstName: String;
    lastName: String;
    email: String;
    address: AddressModel;
    phoneNumber: String;

    constructor(firstName: String, lastName: String, email: String, address: AddressModel, phoneNumber: String) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
